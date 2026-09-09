// ─────────────────────────────────────────────────────────────────────────────
// THE SINGLE SOURCE OF TRUTH for résumé content + where each gym sits on the map.
// Edit this file to update the whole portfolio. Tile coords are [col, row] on the
// region grid defined in src/game/world/region.js (REGION_COLS x REGION_ROWS).
// ─────────────────────────────────────────────────────────────────────────────

export const STARTER = {
  id: "starter",
  name: "Starter House",
  doorTile: [23, 30],
  building: { w: 6, h: 5, roof: "#c2452d" },
  title: "Arnab's Journey",
  lines: [
    "Welcome to the Devroot Region!",
    "I'm Arnab Ghosh — Software Engineer, working on production GenAI systems.",
    "This whole portfolio is a game. Walk the routes, challenge each gym, and collect a badge for every milestone of my career.",
    "Use ARROW KEYS or WASD to move. Walk into a doorway to enter. Press M any time for the map & badge case.",
    "Ready? Head north to the first gym.",
  ],
};

export const GYMS = [
  {
    id: "education",
    name: "Scholar's Gym",
    order: 1,
    doorTile: [10, 24],
    building: { w: 6, h: 5, roof: "#6d28d9" },
    leader: { name: "Dean Vellore", title: "Leader of the Scholar's Gym", color: "#8b5cf6" },
    badge: { id: "scholar", name: "Scholar Badge", color: "#a78bfa", shape: "book" },
    showcase: "scroll",
    intro: [
      "So you want to challenge the Scholar's Gym.",
      "Four years of Information Technology at Vellore Institute of Technology. Prove you did the reading.",
    ],
    content: {
      headline: "Vellore Institute of Technology, Vellore",
      subhead: "B.Tech, Information Technology",
      dateRange: "2021 – 2025",
      stat: { label: "CGPA", value: "8.48 / 10" },
      bullets: [
        "Bachelor of Technology in Information Technology.",
        "Focus across application development, databases, and applied machine learning.",
      ],
      tags: ["Information Technology", "Vellore, India"],
    },
    reward: "The Scholar Badge is yours. Foundations: locked in.",
  },
  {
    id: "experience",
    name: "Foundry Gym",
    order: 2,
    doorTile: [24, 18],
    building: { w: 8, h: 6, roof: "#b45309" },
    leader: { name: "Forge-Master Source", title: "Leader of the Foundry Gym", color: "#f97316" },
    badge: { id: "forge", name: "Forge Badge", color: "#fb923c", shape: "anvil" },
    showcase: "trophy",
    intro: [
      "The Foundry Gym runs hot. This is where career meets production traffic.",
      "Software Engineer at Firstsource Solutions since July 2025 — GenAI, on real workloads.",
      "Every plate you see glowing is a system that shipped. Walk through them.",
    ],
    content: {
      headline: "Firstsource Solutions Limited",
      subhead: "Software Engineer — GenAI (Remote)",
      dateRange: "Jul 2025 – Present",
      floors: [
        {
          title: "Intelligent document automation",
          body: "Built and deployed a GenAI-powered system for Deed, Mortgage and Tax processing — end-to-end pipelines for ingestion, prompt-engineered extraction, structured JSON transformation and enterprise integration.",
        },
        {
          title: "Resware integration",
          body: "Integrated REST-API workflows with Resware, removing manual processing and cutting package handling time to ~4.5 minutes at 100% extraction accuracy.",
        },
        {
          title: "Guardrails & schema enforcement",
          body: "Implemented Pydantic validation with automated retry/correction and a custom HuggingFace transformer validation layer for semantic verification, hallucination detection and confidence scoring — over 40% fewer structured-extraction failures.",
        },
        {
          title: "Enterprise AI guardrails framework",
          body: "Built a framework with 10+ content validators (jailbreak, prompt injection, PII, toxicity, bias) across Azure, AWS and GCP safety services, with primary/fallback model design and cross-cloud cost estimation.",
        },
        {
          title: "RAG over 100k+ documents",
          body: "Engineered a retrieval pipeline for automated form testing and validation — chunking, vector indexing and retrieval workflows for scalable document search.",
        },
        {
          title: "Distributed batch inference on Azure Batch",
          body: "Architected an event-driven system (Azure Functions coordinator, Service Bus triggered) submitting tasks to an autoscaling pool, with deterministic idempotent task IDs guaranteeing exactly-once processing under at-least-once delivery.",
        },
        {
          title: "Multi-LLM load balancing",
          body: "Designed per-task endpoint assignment and token-bucket TPM throttling across multiple Azure OpenAI endpoints — eliminated 429 rate-limit failures and sustained high-throughput concurrent inference.",
        },
        {
          title: "Python automation tooling",
          body: "Developed Playwright + n8n tools for end-to-end form workflows — Excel ingestion, automated form filling across authenticated sessions, structured output generation.",
        },
      ],
      tags: ["GenAI", "Azure", "AWS", "GCP", "RAG", "Guardrails", "Python"],
    },
    reward: "The Forge Badge is yours. That was eight shipped systems in one building.",
  },
  {
    id: "travel-buddy",
    name: "Voyage Gym",
    order: 3,
    doorTile: [37, 22],
    building: { w: 6, h: 5, roof: "#0e7490" },
    leader: { name: "Wayfarer Gemini", title: "Leader of the Voyage Gym", color: "#06b6d4" },
    badge: { id: "voyage", name: "Voyage Badge", color: "#22d3ee", shape: "compass" },
    showcase: "trophy",
    project: true,
    intro: [
      "The Voyage Gym is for the ones who turn a messy trip into a clean plan.",
      "Travel Buddy — an AI-first travel companion with a multi-modal extraction pipeline.",
    ],
    content: {
      headline: "Travel Buddy",
      subhead: "AI-first travel companion with a multi-modal extraction pipeline",
      stack: ["Python", "FastAPI", "Gemini 2.5 Flash", "SQLite", "yt-dlp", "Docker"],
      bullets: [
        "4-stage multi-modal extraction pipeline (yt-dlp metadata → Gemini video → Gemini audio → Open Graph fallback) with graceful degradation at every tier — turns Instagram reels, YouTube shorts and Maps links into structured travel notes.",
        "Gemini 2.5 Flash via REST API using native vision, audio and video in a single call, with responseSchema-enforced JSON and zero post-processing; hardened subprocess orchestration with timeouts, fallbacks and stderr diagnostics.",
        "Backend as RESTful services across 9 route modules over FastAPI/SQLite with idempotent, backward-compatible schema migrations; real-time GPS auto-visit detector and smart-routing endpoint (Haversine + nearest-neighbour + 2-opt heuristic); containerised with Docker and deployed to cloud.",
      ],
      links: [
        { label: "GitHub", url: "https://github.com/RonnieArnab", note: "repo link — swap for the exact URL" },
      ],
    },
    reward: "The Voyage Badge is yours. Every reel is now an itinerary.",
  },
  {
    id: "resume-editor",
    name: "Scribe Gym",
    order: 4,
    doorTile: [15, 12],
    building: { w: 6, h: 5, roof: "#1d4ed8" },
    leader: { name: "Archivist Tectonic", title: "Leader of the Scribe Gym", color: "#3b82f6" },
    badge: { id: "scribe", name: "Scribe Badge", color: "#60a5fa", shape: "quill" },
    showcase: "trophy",
    project: true,
    intro: [
      "The Scribe Gym rewards precision. One wrong brace and the whole document fails to compile.",
      "AI Resume Editor — an agentic résumé-tailoring system, LaTeX-native.",
    ],
    content: {
      headline: "AI Resume Editor",
      subhead: "Agentic résumé-tailoring system with a LaTeX-native edit pipeline",
      stack: ["Python", "FastAPI", "OpenAI function calling", "LaTeX", "tectonic"],
      bullets: [
        "OpenAI function-calling agent loop (up to 8 tool-call steps) with 7 tools spanning section retrieval, LaTeX validation and staged-edit proposals for both single-section and multi-section editing modes.",
        "Server-side re-validation gate: every agent-proposed edit is independently tested for LaTeX correctness and structural integrity before it reaches the user — including a custom guard against the model silently dropping section headings.",
        "Sandboxed LaTeX compilation pipeline (tectonic subprocess, timeout-bound, network-restricted) with a fast pre-compile syntax validator that catches most errors in milliseconds instead of a multi-second recompile.",
      ],
      links: [
        { label: "GitHub", url: "https://github.com/RonnieArnab", note: "repo link — swap for the exact URL" },
      ],
    },
    reward: "The Scribe Badge is yours. The document compiles.",
  },
  {
    id: "skills",
    name: "The Lab",
    order: 5,
    doorTile: [30, 9],
    building: { w: 7, h: 5, roof: "#15803d" },
    leader: { name: "Professor Devroot", title: "Keeper of the Lab", color: "#22c55e" },
    badge: { id: "roster", name: "Roster Badge", color: "#4ade80", shape: "ball" },
    showcase: "creature",
    intro: [
      "Welcome to the Lab. This is where the skill-creatures live.",
      "Each one is a tool Arnab actually ships with. Meet the roster, then take the badge.",
    ],
    content: {
      headline: "Skill Roster",
      subhead: "Languages, frameworks and platforms — as a team you can inspect",
      groups: [
        { label: "Programming Languages", items: ["Python", "Java", "JavaScript", "SQL"] },
        {
          label: "Application Development",
          items: ["FastAPI", "Node.js", "Express.js", "REST APIs", "React", "Application design", "Debugging"],
        },
        { label: "Databases", items: ["MongoDB", "MySQL", "SQLite", "AWS RDS"] },
        {
          label: "GenAI & Automation",
          items: ["LLM integration", "Agentic AI", "RAG", "Prompt engineering", "HuggingFace Transformers", "Guardrails", "Playwright", "n8n"],
        },
        {
          label: "Tools & Platforms",
          items: ["Docker", "Azure (Batch, Functions, OpenAI, Service Bus)", "AWS", "Git", "Linux", "Postman"],
        },
      ],
    },
    reward: "The Roster Badge is yours. The whole team is in your corner now.",
  },
  {
    id: "contact",
    name: "Comm Center",
    order: 6,
    doorTile: [24, 5],
    building: { w: 8, h: 5, roof: "#be123c" },
    leader: { name: "Operator Nurse", title: "Comm Center", color: "#f43f5e" },
    badge: { id: "link", name: "Link Badge", color: "#fb7185", shape: "signal" },
    showcase: "crystal",
    isContact: true,
    intro: [
      "You've reached the Comm Center at the top of the region.",
      "This is where trainers trade contact details. If anything you saw fits what you're building — let's talk.",
    ],
    content: {
      headline: "Let's connect",
      subhead: "Open to strong backend / GenAI engineering roles and collaborations.",
    },
    reward: "The Link Badge is yours. You've cleared the Devroot Region — thanks for playing.",
  },
];

export const ALL_STOPS = [STARTER, ...GYMS];
export const gymById = (id) => GYMS.find((g) => g.id === id);
export const TOTAL_BADGES = GYMS.length;
