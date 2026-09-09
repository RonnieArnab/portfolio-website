import { useGame } from "../state/GameContext.jsx";
import { STARTER, GYMS } from "../data/journey.js";
import { PROFILE, SOCIALS } from "../data/socials.js";
import { CREATURES } from "../data/creatures.js";
import PixelButton from "../components/PixelButton.jsx";
import Icon from "../components/Icon.jsx";

// Plain, semantic, keyboard-friendly view of the exact same data as the game.
// This is what recruiters / screen-reader users get.
export default function ResumeMode() {
  const { state, dispatch } = useGame();
  const edu = GYMS.find((g) => g.id === "education");
  const exp = GYMS.find((g) => g.id === "experience");
  const projects = GYMS.filter((g) => g.project);

  const back = () =>
    dispatch({ type: state.started ? "BACK_TO_WORLD" : "GOTO", scene: "title" });

  return (
    <div className="scroll-ok min-h-full overflow-y-auto bg-parchment text-ink">
      <div className="mx-auto max-w-3xl px-5 py-10 font-term text-lg leading-relaxed">
        <div className="mb-6 flex items-center justify-between">
          <PixelButton onClick={back} variant="lite" className="text-[9px]">
            ◀ {state.started ? "Back to the region" : "Back to title"}
          </PixelButton>
          <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="pixel-btn text-[9px]">
            Download PDF
          </a>
        </div>

        <header className="border-b-4 border-ink pb-4">
          <h1 className="font-pixel text-xl uppercase">{PROFILE.name}</h1>
          <p className="mt-2 text-xl">{PROFILE.title}</p>
          <p className="text-ink/70">{PROFILE.tagline}</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-base">
            <li>{PROFILE.location}</li>
            {SOCIALS.map((s) => (
              <li key={s.id}>
                <a className="underline" href={s.url} target="_blank" rel="noreferrer">
                  {s.label}: {s.handle}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <Section title="Experience">
          <h3 className="font-pixel text-[11px] uppercase">{exp.content.headline}</h3>
          <p className="text-ink/70">
            {exp.content.subhead} — {exp.content.dateRange}
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            {exp.content.floors.map((f, i) => (
              <li key={i}>
                <strong>{f.title}.</strong> {f.body}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Projects">
          {projects.map((p) => (
            <article key={p.id} className="mb-4">
              <h3 className="font-pixel text-[11px] uppercase">{p.content.headline}</h3>
              <p className="text-ink/70">{p.content.subhead}</p>
              <p className="text-base text-ink/60">{p.content.stack.join(" · ")}</p>
              <ul className="mt-1 list-disc space-y-1.5 pl-5">
                {p.content.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              {p.content.links?.map((l) => (
                <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="mr-3 underline">
                  {l.label}
                </a>
              ))}
            </article>
          ))}
        </Section>

        <Section title="Education">
          <h3 className="font-pixel text-[11px] uppercase">{edu.content.headline}</h3>
          <p className="text-ink/70">
            {edu.content.subhead} — {edu.content.dateRange}
          </p>
          <p>
            {edu.content.stat.label}: {edu.content.stat.value}
          </p>
        </Section>

        <Section title="Skills">
          {GYMS.find((g) => g.id === "skills").content.groups.map((g) => (
            <p key={g.label} className="mb-1.5">
              <strong>{g.label}:</strong> {g.items.join(", ")}
            </p>
          ))}
          <details className="mt-3">
            <summary className="cursor-pointer font-pixel text-[9px] uppercase">
              …as skill-creatures
            </summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-base">
              {CREATURES.map((c) => (
                <li key={c.id}>
                  <strong>{c.name}</strong> ({c.type}) — {c.skill}. {c.lore}
                </li>
              ))}
            </ul>
          </details>
        </Section>

        <Section title="About this site">
          <p>
            {STARTER.title}: this portfolio is a small top-down RPG. The plain view
            you're reading now carries the same content. Built with React, a custom
            canvas engine, and React Three Fiber. No Nintendo assets are used — every
            creature, gym and badge is original. Source:{" "}
            <a className="underline" href="https://github.com/RonnieArnab/portfolio-website" target="_blank" rel="noreferrer">
              github.com/RonnieArnab/portfolio-website
            </a>
            .
          </p>
        </Section>

        <footer className="mt-10 flex items-center gap-3 border-t-4 border-ink pt-4 text-base">
          {SOCIALS.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
              <Icon name={s.icon} size={20} />
            </a>
          ))}
        </footer>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-7">
      <h2 className="mb-2 border-b-2 border-ink/30 font-pixel text-sm uppercase text-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}
