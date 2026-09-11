import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Ico from "./Ico.jsx";
import AgentChat from "./AgentChat.jsx";
import MatchOverlay from "./MatchOverlay.jsx";
import PhotoGallery from "./PhotoGallery.jsx";
import { ProjectStories, CareerTimeline } from "./CareerStory.jsx";
import SkillsOverview from "./SkillsOverview.jsx";
import { HEADER, CONTACT } from "../data/profile.js";
import "../styles/profile-v3.css";

const PROMPTS = [
  { question: "My love language is…", answer: "Making the complicated feel effortless.", detail: "Whether that's a reliable AI pipeline, a thoughtful interface, or a travel plan that finally escapes the group chat." },
  { question: "I geek out on…", answer: "Thoughtful systems. Unfamiliar places.", detail: "I like understanding how things work, whether that means exploring a new city or untangling a tricky workflow." },
  { question: "We'll get along if…", answer: "You care about what happens after the demo.", detail: "The retries, the validation, the edge cases. That's where a promising AI idea becomes a product people can depend on." },
  { question: "My ideal weekend…", answer: "Somewhere new, with a story to bring home.", detail: "A skyline, a beach, a sunset walk. A little curiosity goes a long way." },
];
export default function ProfileApp() {
  const reduced = useReducedMotion();
  const [sheet, setSheet] = useState(null);
  const [label, setLabel] = useState(null);
  const [prompt, setPrompt] = useState(0);
  const [nav, setNav] = useState("discover");
  const [likes, setLikes] = useState([]);
  const swipe = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setNav(visible[0].target.id);
    }, { rootMargin: "-10% 0px -55% 0px" });
    document.querySelectorAll("main > section[id]").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  function like(text) { setLabel(text); setLikes(previous => previous.includes(text) ? previous : [...previous, text]); setSheet("match"); }
  function next(delta) { setPrompt(i => (i + delta + PROMPTS.length) % PROMPTS.length); }
  return <div className="match-portfolio">
    <a className="skip-content" href="#discover">Skip to profile</a>
    <header className="match-nav"><a className="match-wordmark" href="#discover">arnab<span>.</span><small>made for a good match</small></a><nav aria-label="Portfolio sections">{[["discover", "Discover"], ["work", "My work"], ["timeline", "Experience"], ["skills", "Skills"]].map(([id, name]) => <a key={id} href={`#${id}`} aria-current={nav === id ? "location" : undefined} className={nav === id ? "active" : ""} onClick={() => setNav(id)}>{name}</a>)}</nav><button className="nav-contact" onClick={() => like(null)}>Let’s talk <Ico name="arrow" size={18} /></button></header>
    <main>
      <section className="discover-section" id="discover">
        <div className="discover-topline"><span><i /> ONE OF ONE. OPEN TO WHAT'S NEXT.</span><span>More personality. Less PDF.</span></div>
        <div className="discover-grid"><PhotoGallery onLike={like} /><div className="profile-introduction">
          <p className="match-eyebrow">MEET YOUR NEXT TEAMMATE</p><h1>Good at code.<br /><em>Better in a team.</em></h1>
          <p className="profile-bio">Hey, I'm Arnab — a software engineer who builds production AI systems, explores new places, and never says no to a good view.</p>
          <div className="profile-facts"><span><Ico name="work" size={15} /> GenAI engineer</span><span><Ico name="pin" size={15} /> India · Remote</span><span><Ico name="school" size={15} /> VIT Vellore</span></div>
          <div className="hinge-prompt" aria-live="polite" onPointerDown={e => { swipe.current = e.clientX; }} onPointerCancel={() => { swipe.current = null; }} onPointerUp={e => { if (swipe.current !== null && Math.abs(e.clientX - swipe.current) > 45) next(e.clientX < swipe.current ? 1 : -1); swipe.current = null; }}>
            <AnimatePresence mode="wait" initial={false}><motion.div key={prompt} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: reduced ? 1 : 0 }} transition={{ duration: .15 }}><p>{PROMPTS[prompt].question}</p><h2>{PROMPTS[prompt].answer}</h2><span>{PROMPTS[prompt].detail}</span></motion.div></AnimatePresence>
            <div className="prompt-bottom"><div className="prompt-dots">{PROMPTS.map((p, i) => <button key={p.question} aria-label={`Read prompt ${i + 1}`} aria-pressed={i === prompt} onClick={() => setPrompt(i)}><span /></button>)}</div><button aria-label="Like this prompt" className={likes.includes(PROMPTS[prompt].answer) ? "liked" : ""} onClick={() => like(PROMPTS[prompt].answer)}><Ico name="heart" size={21} /></button></div>
          </div>
          <div className="profile-prompt-actions"><div className="prompt-navigation"><button aria-label="Previous prompt" onClick={() => next(-1)}><span aria-hidden="true">←</span> Previous</button><button aria-label="Next prompt" onClick={() => next(1)}>Next <span aria-hidden="true">→</span></button></div><button className="profile-chat" onClick={() => setSheet("chat")}><Ico name="chat" size={19} /> Ask about my work</button></div>
          <p className="profile-microcopy">Looking for a good team, an interesting problem, and a chance to build.</p>
        </div></div>
      </section>
      <div className="personality-strip"><span>BUILDING THINGS THAT MATTER</span><p>Python at work.<b>✦</b>New places after hours.<b>✦</b>Curious everywhere.</p><a href={CONTACT.resume} target="_blank" rel="noreferrer">The traditional résumé ↗</a></div>
      <section id="work" className="match-section"><div className="match-section-heading"><div><p className="match-eyebrow">A LITTLE PROOF OF CHEMISTRY</p><h2>Things I've <em>put my heart into.</em></h2></div><p>Real problems. Thoughtful systems. <br />The details that make them work.</p></div><ProjectStories onLike={like} /></section>
      <section id="timeline" className="match-section timeline-section"><div className="match-section-heading"><div><p className="match-eyebrow">THE STORY SO FAR</p><h2>Always a work <em>in progress.</em></h2></div><p>From learning the fundamentals <br />to shipping them at scale.</p></div><CareerTimeline /></section>
      <section id="skills" className="match-section skill-section"><div className="match-section-heading"><div><p className="match-eyebrow">WHAT I BRING TO THE TEAM</p><h2>Useful skills. <em>Real applications.</em></h2></div><p>The tools matter. <br />What they help people do matters more.</p></div><SkillsOverview /></section>
      <section className="last-prompt" id="contact"><p className="match-eyebrow">YOUR MOVE</p><h2>Think we'd make <em>a good team?</em></h2><p>Tell me what you're building. I'd love to hear about it.</p><button onClick={() => like("building something together")}>Let's make it a match <Ico name="heart" size={18} /></button></section>
    </main>
    <footer className="match-footer"><span>© {new Date().getFullYear()} {HEADER.fullName} · Made with curiosity.</span><div><a href="https://github.com/RonnieArnab" target="_blank" rel="noreferrer">GitHub ↗</a><a href={CONTACT.resume} target="_blank" rel="noreferrer">Résumé ↗</a><a href="mailto:as920037.arnabghosh@gmail.com">Say hello ↗</a></div></footer>
    <AnimatePresence>{sheet === "chat" && <AgentChat key="chat" onClose={() => setSheet(null)} />}{sheet === "match" && <MatchOverlay key="match" likedLabel={label} reduced={!!reduced} onClose={() => setSheet(null)} />}</AnimatePresence>
  </div>;
}
