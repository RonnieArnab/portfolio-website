// Vercel serverless function — the "Ask about Arnab" agent.
//
// The API key lives here, server-side, and never reaches the browser.
// Set ANTHROPIC_API_KEY in the Vercel project's Environment Variables.

import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "./_context.js";

const MODEL = "claude-opus-5";
const MAX_TOKENS = 1024;
const MAX_MESSAGES = 20; // conversation turns accepted from the client
const MAX_CHARS = 800; // per user message

// Cheap per-instance rate limit. Serverless instances are not shared, so this
// is a speed bump rather than a hard guarantee — good enough to stop a casual
// abuser from running up the bill. Move to Vercel KV / Upstash if it matters.
const WINDOW_MS = 60_000;
const MAX_REQ_PER_WINDOW = 12;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const bucket = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  bucket.push(now);
  hits.set(ip, bucket);
  if (hits.size > 5000) hits.clear(); // crude memory bound
  return bucket.length > MAX_REQ_PER_WINDOW;
}

function clientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string") return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

/** Accept only well-formed, bounded chat history. */
function sanitize(raw) {
  if (!Array.isArray(raw)) return null;
  const msgs = raw
    .slice(-MAX_MESSAGES)
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  // The API requires the first message to be from the user.
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  if (msgs.length === 0) return null;
  if (msgs[msgs.length - 1].role !== "user") return null;
  return msgs;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({
      error:
        "The chat agent isn't configured yet — set ANTHROPIC_API_KEY in the Vercel project.",
    });
  }

  if (rateLimited(clientIp(req))) {
    return res
      .status(429)
      .json({ error: "Slow down a second — too many messages. Try again in a minute." });
  }

  const messages = sanitize(req.body?.messages);
  if (!messages) {
    return res.status(400).json({ error: "Invalid conversation payload." });
  }

  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  const send = (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);

  try {
    const client = new Anthropic();

    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      // Simple Q&A over a fixed document — low effort keeps it fast and cheap.
      // Thinking stays on (the Opus 5 default); disabling it risks tag leakage.
      output_config: { effort: "low" },
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          // The résumé prefix is identical on every request — cache it.
          cache_control: { type: "ephemeral" },
        },
      ],
      messages,
    });

    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta?.type === "text_delta"
      ) {
        send({ text: event.delta.text });
      }
    }

    const final = await stream.finalMessage();
    if (final.stop_reason === "refusal") {
      send({
        text: "\n\nI can't help with that one — ask me about his work instead.",
      });
    }

    send({ done: true });
    res.end();
  } catch (err) {
    let message = "The agent hit an error. Try again in a moment.";
    if (err instanceof Anthropic.RateLimitError) {
      message = "The agent is rate limited right now — give it a minute.";
    } else if (err instanceof Anthropic.AuthenticationError) {
      message = "The agent's API key is invalid.";
    } else if (err instanceof Anthropic.APIError) {
      message = `The agent hit an API error (${err.status}).`;
    }
    console.error("[api/chat]", err);
    // Headers are already sent, so surface the error through the stream.
    send({ error: message });
    send({ done: true });
    res.end();
  }
}
