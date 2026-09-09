// ─────────────────────────────────────────────────────────────────────────────
// The dating-app profile. This is the front door of the site.
// Content is written in Hinge/Bumble "prompt + answer" voice but every claim is
// pulled from the résumé (src/data/journey.js) — edit both together.
// ─────────────────────────────────────────────────────────────────────────────

import { PROFILE, SOCIALS } from "./socials.js";
import { GYMS } from "./journey.js";

const exp = GYMS.find((g) => g.id === "experience");
const edu = GYMS.find((g) => g.id === "education");
const projects = GYMS.filter((g) => g.project);
const skills = GYMS.find((g) => g.id === "skills");

export const HEADER = {
  name: PROFILE.name.split(" ")[0], // "Arnab" — first-name basis, like the apps
  fullName: PROFILE.name,
  // Dating apps put age here. A portfolio is more useful with availability.
  status: "Open to work",
  role: PROFILE.title,
  distance: "Remote · India",
  verified: true,
  photo: PROFILE.photo,
  tagline: PROFILE.tagline,
};

export const VITALS = [
  { icon: "work", label: "Software Engineer — GenAI" },
  { icon: "pin", label: "India · Remote" },
  { icon: "school", label: "B.Tech IT, VIT Vellore" },
  { icon: "code", label: "Python · FastAPI · Azure" },
  { icon: "sparkle", label: "Ships LLM systems to production" },
  { icon: "clock", label: "Replies fast" },
];

// The card deck, in scroll order. `kind` selects the renderer.
export const CARDS = [
  { id: "hero", kind: "hero" },

  {
    id: "vitals",
    kind: "vitals",
  },

  {
    id: "p1",
    kind: "prompt",
    prompt: "My most controversial opinion",
    answer:
      "Guardrails aren't a nice-to-have you bolt on before launch. I built a framework with 10+ content validators — jailbreak, prompt injection, PII, toxicity, bias — across Azure, AWS and GCP, with primary/fallback model design. If your LLM feature has no validation layer, you don't have a feature, you have a liability.",
  },

  {
    id: "proj-travel",
    kind: "project",
    project: projects.find((p) => p.id === "travel-buddy"),
    blurb:
      "Turns an Instagram reel into an actual itinerary. Four-stage multi-modal pipeline with graceful degradation at every tier.",
  },

  {
    id: "p2",
    kind: "prompt",
    prompt: "I geek out on",
    answer:
      "Retrieval over 100k+ documents. Chunking strategy, vector indexing, and the unglamorous part nobody posts about — making retrieval actually return the right paragraph when the query is phrased badly.",
  },

  {
    id: "experience",
    kind: "experience",
    company: exp.content.headline,
    role: exp.content.subhead,
    dates: exp.content.dateRange,
    floors: exp.content.floors,
  },

  {
    id: "p3",
    kind: "prompt",
    prompt: "We'll get along if",
    answer:
      "You think a 429 rate-limit error is a design problem, not a retry problem. I fixed ours with per-task endpoint assignment and token-bucket TPM throttling across multiple Azure OpenAI endpoints. Zero 429s since.",
  },

  {
    id: "proj-resume",
    kind: "project",
    project: projects.find((p) => p.id === "resume-editor"),
    blurb:
      "An agent loop that edits LaTeX résumés — and a server-side gate that re-validates every single edit before you ever see it.",
  },

  {
    id: "p4",
    kind: "prompt",
    prompt: "My love language is",
    answer:
      "Deterministic idempotent task IDs. I architected an event-driven batch inference system on Azure Batch where exactly-once processing is guaranteed even under at-least-once delivery. You can poke it a hundred times; it does the work once.",
  },

  {
    id: "skills",
    kind: "skills",
    groups: skills.content.groups,
  },

  {
    id: "p5",
    kind: "prompt",
    prompt: "The way to win me over is",
    answer:
      "A well-scoped ticket and a staging environment. Second best: telling me the manual process takes 45 minutes. I got document package handling down to ~4.5 minutes at 100% extraction accuracy, and I'd like to do that to your workflow too.",
  },

  {
    id: "education",
    kind: "education",
    school: edu.content.headline,
    degree: edu.content.subhead,
    dates: edu.content.dateRange,
    stat: edu.content.stat,
  },

  {
    id: "secret",
    kind: "secret",
    prompt: "My hidden talent",
    answer:
      "I built this entire career history a second time — as a playable top-down RPG. Six gyms, one per milestone, and my skills are collectible creatures.",
    cta: "Play it",
    href: "/rpg",
  },
];

export const CONTACT = { ...PROFILE, socials: SOCIALS };

// Suggested opening lines for the AI agent — shown as tappable chips.
export const SUGGESTED_QUESTIONS = [
  "What's the hardest thing he's shipped?",
  "Is he a fit for a backend role?",
  "Has he done RAG at real scale?",
  "What's his experience with Azure?",
  "Why should we interview him?",
];
