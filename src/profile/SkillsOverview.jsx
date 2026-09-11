import { CHAPTERS } from "../data/experience.js";

const CAPABILITIES = [
  { title: "AI systems that hold up", description: "Retrieval, validation, and agent workflows built around real production requirements.", tools: "RAG · Pydantic · LLM integration", proof: "Retrieval over 100k+ documents; guardrails with 10+ validators.", href: "#timeline", link: "See my experience" },
  { title: "Backends that connect the dots", description: "Clear APIs and dependable pipelines that turn unstructured inputs into useful products.", tools: "Python · FastAPI · SQL", proof: "Travel Buddy combines four extraction stages across nine API modules.", href: "#work", link: "Explore my projects" },
  { title: "Workflows that scale", description: "Cloud coordination, controlled throughput, and automation for the work between systems.", tools: "Azure · Docker · Playwright · n8n", proof: "Event-driven batch inference and automated document and form workflows.", href: "#timeline", link: "See the systems I've shipped" },
];

export default function SkillsOverview() {
  const groups = CHAPTERS.find(c => c.id === "skills").content.groups;
  return <>
    <div className="capability-grid">{CAPABILITIES.map((item, index) => <article className="capability" key={item.title}>
      <span className="capability-number">0{index + 1}</span>
      <h3>{item.title}</h3><p>{item.description}</p>
      <p className="capability-tools">{item.tools}</p>
      <div className="capability-proof"><span>IN PRACTICE</span><p>{item.proof}</p></div>
      <a href={item.href}>{item.link}<span aria-hidden="true">↗</span></a>
    </article>)}</div>
    <details className="full-toolkit"><summary>Explore the full toolkit <span aria-hidden="true">+</span></summary>
      <div className="toolkit-groups">{groups.map(group => <div key={group.label}><h3>{group.label}</h3><p>{group.items.join(" · ")}</p></div>)}</div>
    </details>
  </>;
}
