import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Ico from "./Ico.jsx";
import { HEADER, SUGGESTED_QUESTIONS } from "../data/profile.js";

const GREETING =
  "Hey — I'm Arnab's wingman. Ask me anything about his work and I'll answer straight from his résumé. Where do you want to start?";

export default function AgentChat({ onClose }) {
  const [messages, setMessages] = useState([]); // {role, content}
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const abortRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function send(text) {
    const question = text.trim();
    if (!question || busy) return;

    setError(null);
    setInput("");
    const next = [...messages, { role: "user", content: question }];
    setMessages(next);
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });

      const type = res.headers.get("content-type") || "";

      if (!res.ok || !type.includes("text/event-stream")) {
        let msg =
          "The agent isn't reachable. If you're running this locally, use `vercel dev` (plain `vite` doesn't serve /api).";
        if (type.includes("application/json")) {
          const body = await res.json().catch(() => null);
          if (body?.error) msg = body.error;
        }
        throw new Error(msg);
      }

      // Open an empty assistant bubble and fill it as tokens arrive.
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";

        for (const chunk of chunks) {
          const line = chunk.trim();
          if (!line.startsWith("data:")) continue;
          let payload;
          try {
            payload = JSON.parse(line.slice(5).trim());
          } catch {
            continue;
          }
          if (payload.error) throw new Error(payload.error);
          if (payload.text) {
            setMessages((m) => {
              const copy = [...m];
              copy[copy.length - 1] = {
                role: "assistant",
                content: copy[copy.length - 1].content + payload.text,
              };
              return copy;
            });
          }
        }
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message);
      // Drop a trailing empty assistant bubble if nothing streamed.
      setMessages((m) =>
        m.length && m[m.length - 1].role === "assistant" && !m[m.length - 1].content
          ? m.slice(0, -1)
          : m
      );
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink2/45 backdrop-blur-[2px]"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Arnab's AI wingman"
        initial={{ y: "100%", opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="relative flex h-[86vh] w-full max-w-[440px] flex-col overflow-hidden rounded-t-[26px] bg-cream shadow-lift sm:h-[640px] sm:rounded-[26px]"
      >
        {/* header */}
        <header className="flex items-center gap-3 border-b border-hush bg-card px-4 py-3">
          <div className="relative grid h-10 w-10 place-items-center rounded-full bg-blush text-white">
            <Ico name="sparkle" size={20} />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-mint" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold text-ink2">
              {HEADER.name}'s AI wingman
            </p>
            <p className="text-[12px] text-mint">Online · answers from the résumé</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-hush"
          >
            <Ico name="x" size={19} />
          </button>
        </header>

        {/* messages */}
        <div ref={scrollRef} className="scroll-ok no-bar flex-1 space-y-3 overflow-y-auto px-4 py-4">
          <Bubble role="assistant">{GREETING}</Bubble>

          {messages.map((m, i) => (
            <Bubble key={i} role={m.role}>
              {m.content}
              {busy && i === messages.length - 1 && m.role === "assistant" && (
                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-blink bg-ink2" />
              )}
            </Bubble>
          ))}

          {busy && messages[messages.length - 1]?.role === "user" && <Typing />}

          {error && (
            <p className="rounded-2xl bg-blush/10 px-4 py-3 text-[13.5px] leading-relaxed text-blush">
              {error}
            </p>
          )}

          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-hush bg-card px-3.5 py-2 text-left text-[13px] text-ink2/80 transition-colors hover:border-blush hover:text-blush"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-hush bg-card px-3 py-3"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={800}
            placeholder={busy ? "Thinking…" : "Ask about his work…"}
            aria-label="Your question"
            className="min-w-0 flex-1 rounded-full bg-hush px-4 py-3 text-[15px] text-ink2 outline-none placeholder:text-muted/70"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blush text-white transition-opacity disabled:opacity-35"
          >
            <Ico name="send" size={19} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function Bubble({ role, children }) {
  const mine = role === "user";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-[20px] px-4 py-2.5 text-[14.5px] leading-relaxed ${
          mine
            ? "rounded-br-md bg-blush text-white"
            : "rounded-bl-md bg-card text-ink2 shadow-soft"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-1.5 rounded-[20px] rounded-bl-md bg-card px-4 py-3.5 shadow-soft">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 animate-blink rounded-full bg-muted/60"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  );
}
