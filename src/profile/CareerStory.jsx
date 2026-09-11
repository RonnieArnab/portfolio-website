import { useState } from "react";
import { CHAPTERS } from "../data/experience.js";
import Ico from "./Ico.jsx";

const experience = CHAPTERS.find(g => g.id === "experience");
const projects = CHAPTERS.filter(g => g.project);
const STORIES = {
  "travel-buddy": {
    label: "FROM SAVED REEL TO REAL TRIP", title: "Your travel inspiration, with a plan attached.", description: "Travel Buddy turns the places buried in Instagram reels, YouTube shorts, and Maps links into structured travel notes. Less screenshot archaeology. More getting out the door.",
    result: "4 extraction stages · 9 API modules", steps: ["Paste a travel link", "Extract video, audio & metadata", "Save places & plan a route"],
    details: ["A four-stage pipeline starts with metadata, then tries video, audio, and Open Graph. Each stage can fall back gracefully instead of ending the journey with an error.", "Gemini's multimodal output is constrained to a JSON schema. FastAPI and SQLite make the extracted places available through clean, persistent APIs.", "GPS-based visit detection and route planning connect saved inspiration to the actual trip. Docker packages the service for deployment."],
  },
  "resume-editor": {
    label: "AN AGENT THAT CHECKS ITS OWN HOMEWORK", title: "Tailor the résumé. Keep the structure intact.", description: "AI Resume Editor brings an agent loop to LaTeX résumés. It proposes focused changes, validates them on the server, and checks that the document still compiles before the edit reaches you.",
    result: "7 agent tools · Independent validation", steps: ["Understand the requested change", "Propose a precise LaTeX edit", "Validate, compile & review"],
    details: ["The agent can retrieve sections, validate LaTeX, and stage edits with seven tools across up to eight tool-call steps.", "Every proposed edit goes through an independent server-side gate. Structural checks catch mistakes such as dropped section headings, not just broken braces.", "A fast syntax pass catches obvious errors before a sandboxed, timeout-bound Tectonic compilation checks the full document."],
  },
};
export function ProjectStories({ onLike }) {
  const [open, setOpen] = useState(null);
  return <div className="project-stories">{projects.map((p, i) => { const s = STORIES[p.id]; return <article key={p.id} className={`project-story project-${i}`}>
    <div className="project-kicker"><span>0{i + 1} / {p.content.headline}</span><button aria-label={`Like ${p.content.headline}`} onClick={() => onLike(p.content.headline)}><Ico name="heart" size={19} /></button></div>
    <p className="eyebrow">{s.label}</p><h3>{s.title}</h3><p className="project-description">{s.description}</p>
    <div className="project-flow">{s.steps.map((step, j) => <div key={step}><span>0{j + 1}</span><p>{step}</p>{j < 2 && <b>→</b>}</div>)}</div>
    <div className="project-result">↗ <strong>{s.result}</strong></div><div className="project-stack">{p.content.stack.map(t => <span key={t}>{t}</span>)}</div>
    <button className="story-disclosure" aria-expanded={open === p.id} aria-controls={`details-${p.id}`} onClick={() => setOpen(open === p.id ? null : p.id)}>{open === p.id ? "Close the build notes" : "The interesting engineering bits"}<span>{open === p.id ? "−" : "+"}</span></button>
    <div id={`details-${p.id}`} hidden={open !== p.id} className="project-details">{s.details.map((d, j) => <p key={d}><b>0{j + 1}</b>{d}</p>)}</div>
  </article>; })}</div>;
}
export function CareerTimeline() {
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  return <div className="career-timeline">
    <div className="timeline-rail"><button className={active === 0 ? "active" : ""} aria-pressed={active === 0} onClick={() => setActive(0)}><i /><span>JUL 2025 — PRESENT</span><strong>Building for production</strong><small>Firstsource Solutions · Software Engineer, GenAI</small></button><button className={active === 1 ? "active" : ""} aria-pressed={active === 1} onClick={() => setActive(1)}><i /><span>2021 — 2025</span><strong>Building the foundations</strong><small>VIT Vellore · B.Tech, Information Technology</small></button></div>
    <div className="timeline-detail" aria-live="polite">{active === 0 ? <><div className="timeline-tag">THE CURRENT CHAPTER <span>↗</span></div><h3>From model demos<br />to systems people use.</h3><p className="timeline-lead">At Firstsource, I work on the engineering around GenAI: document workflows, retrieval, validation, and infrastructure that can handle production traffic.</p><div className="impact-stats"><div><strong>~4.5 min</strong><span>package handling time</span></div><div><strong>100k+</strong><span>documents in retrieval</span></div><div><strong>40%+</strong><span>fewer extraction failures</span></div></div><div className="shipped-systems">{experience.content.floors.slice(0, showAll ? undefined : 3).map((f, i) => <details key={f.title}><summary><span>0{i + 1}</span>{f.title}<b>+</b></summary><p>{f.body}</p></details>)}</div><button className="story-disclosure" onClick={() => setShowAll(v => !v)} aria-expanded={showAll}>{showAll ? "Show the highlights" : "Explore all 8 shipped systems"}<span>{showAll ? "−" : "↓"}</span></button></> : <><div className="timeline-tag">THE FOUNDATION <span>01</span></div><h3>Four years of curiosity.<br />A foundation to build on.</h3><p className="timeline-lead">B.Tech in Information Technology at Vellore Institute of Technology, Vellore. A foundation in application development, databases, and applied machine learning.</p><div className="impact-stats"><div><strong>8.48</strong><span>CGPA / 10</span></div><div><strong>2025</strong><span>graduating year</span></div></div><p className="education-note">The next chapter put those foundations to work on real GenAI workloads.</p><button className="story-disclosure" onClick={() => setActive(0)}>See where it led <span>→</span></button></>}</div>
  </div>;
}
