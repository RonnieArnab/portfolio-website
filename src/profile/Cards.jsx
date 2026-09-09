import { useState } from "react";
import Ico, { VerifiedBadge } from "./Ico.jsx";
import useReveal from "./useReveal.js";
import { HEADER, VITALS } from "../data/profile.js";

// ── Shell ───────────────────────────────────────────────────────────────────
// Every card is likeable, the way every Hinge card is.
export function CardShell({ children, onLike, likeLabel, liked, className = "", bare }) {
  const [ref, shown] = useReveal();
  return (
    <section
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} relative ${
        bare ? "" : "p-card"
      } ${className}`}
    >
      {children}
      {onLike && (
        <button
          onClick={() => onLike(likeLabel)}
          aria-label={`Like: ${likeLabel}`}
          className={`round-btn absolute -bottom-4 right-5 h-12 w-12 z-10 ${
            liked ? "bg-blush text-white shadow-heart" : "text-blush"
          }`}
        >
          <Ico name="heart" size={22} className={liked ? "animate-pop" : ""} />
        </button>
      )}
    </section>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────
export function HeroCard({ onLike, liked }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <CardShell onLike={onLike} likeLabel="your whole profile" liked={liked}>
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-hush"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setTilt({
            x: ((e.clientY - r.top) / r.height - 0.5) * -8,
            y: ((e.clientX - r.left) / r.width - 0.5) * 8,
          });
        }}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ perspective: "900px" }}
      >
        <img
          src={HEADER.photo}
          alt={HEADER.fullName}
          className="h-full w-full object-cover transition-transform duration-200"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.06)`,
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-[40px] leading-none">{HEADER.name}</h1>
            {HEADER.verified && (
              <VerifiedBadge size={22} className="text-[#4aa3ff]" />
            )}
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-white/90">
            <span className="rounded-full bg-mint px-2.5 py-0.5 text-[12px] font-semibold text-white">
              {HEADER.status}
            </span>
            <span>{HEADER.role}</span>
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-white/70">
            <Ico name="pin" size={14} /> {HEADER.distance}
          </p>
        </div>
      </div>
    </CardShell>
  );
}

// ── Vitals ──────────────────────────────────────────────────────────────────
export function VitalsCard() {
  const icons = { work: "work", pin: "pin", school: "school", code: "code", sparkle: "sparkle", clock: "clock" };
  return (
    <CardShell className="px-5 py-5">
      <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
        The basics
      </p>
      <ul className="flex flex-wrap gap-2">
        {VITALS.map((v) => (
          <li key={v.label} className="chip">
            <Ico name={icons[v.icon] || "sparkle"} size={15} className="text-muted" />
            {v.label}
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-hush pt-4 text-[15px] leading-relaxed text-muted">
        {HEADER.tagline}
      </p>
    </CardShell>
  );
}

// ── Prompt (the Hinge signature) ────────────────────────────────────────────
export function PromptCard({ prompt, answer, onLike, liked }) {
  return (
    <CardShell onLike={onLike} likeLabel={prompt} liked={liked} className="px-6 py-7">
      <p className="prompt-q">{prompt}</p>
      <p className="prompt-a mt-2.5">{answer}</p>
    </CardShell>
  );
}

// ── Project ─────────────────────────────────────────────────────────────────
export function ProjectCard({ project, blurb, onLike, liked }) {
  const [open, setOpen] = useState(false);
  if (!project) return null;
  const c = project.content;

  return (
    <CardShell onLike={onLike} likeLabel={c.headline} liked={liked} className="px-6 py-7">
      <p className="prompt-q">A thing I shipped</p>
      <h3 className="mt-1.5 font-display text-[30px] leading-tight text-ink2">
        {c.headline}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{blurb}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {c.stack.map((t) => (
          <span key={t} className="chip text-[12px]">
            {t}
          </span>
        ))}
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-blush"
        aria-expanded={open}
      >
        {open ? "Show less" : "How it works"}
        <Ico name={open ? "undo" : "arrow"} size={15} />
      </button>

      {open && (
        <ul className="mt-3 space-y-2.5 border-t border-hush pt-3">
          {c.bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-ink2/85">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-honey" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {c.links?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {c.links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="chip-solid hover:opacity-90"
            >
              <Ico name="gh" size={15} /> {l.label}
              <Ico name="external" size={13} className="opacity-60" />
            </a>
          ))}
        </div>
      )}
    </CardShell>
  );
}

// ── Experience ──────────────────────────────────────────────────────────────
export function ExperienceCard({ company, role, dates, floors, onLike, liked }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? floors : floors.slice(0, 3);

  return (
    <CardShell onLike={onLike} likeLabel={company} liked={liked} className="px-6 py-7">
      <p className="prompt-q">Where I spend my weekdays</p>
      <h3 className="mt-1.5 font-display text-[30px] leading-tight text-ink2">
        {company}
      </h3>
      <p className="mt-1 text-[15px] text-muted">{role}</p>
      <p className="mt-0.5 text-[13px] text-muted/70">{dates}</p>

      <ol className="mt-5 space-y-4">
        {shown.map((f, i) => (
          <li key={i} className="relative pl-6">
            <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-blush" />
            {i < shown.length - 1 && (
              <span className="absolute left-[4.5px] top-5 h-[calc(100%+0.6rem)] w-[1.5px] bg-hush" />
            )}
            <p className="text-[15px] font-semibold text-ink2">{f.title}</p>
            <p className="mt-0.5 text-[14px] leading-relaxed text-muted">{f.body}</p>
          </li>
        ))}
      </ol>

      {floors.length > 3 && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-blush"
        >
          {expanded ? "Show less" : `+${floors.length - 3} more systems he shipped`}
          <Ico name={expanded ? "undo" : "down"} size={15} />
        </button>
      )}
    </CardShell>
  );
}

// ── Skills ──────────────────────────────────────────────────────────────────
export function SkillsCard({ groups }) {
  return (
    <CardShell className="px-6 py-7">
      <p className="prompt-q">What I bring to the table</p>
      <div className="mt-4 space-y-4">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
              {g.label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <span key={it} className="chip text-[12.5px]">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

// ── Education ───────────────────────────────────────────────────────────────
export function EducationCard({ school, degree, dates, stat }) {
  return (
    <CardShell className="px-6 py-7">
      <p className="prompt-q">Where it started</p>
      <h3 className="mt-1.5 font-display text-[26px] leading-tight text-ink2">
        {school}
      </h3>
      <p className="mt-1 text-[15px] text-muted">{degree}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="chip">{dates}</span>
        <span className="chip-solid">
          {stat.label} {stat.value}
        </span>
      </div>
    </CardShell>
  );
}

// ── Secret: the RPG ─────────────────────────────────────────────────────────
export function SecretCard({ prompt, answer, cta, href }) {
  return (
    <CardShell bare className="overflow-hidden rounded-[26px] bg-ink text-parchment shadow-lift">
      <div className="relative px-6 py-7">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 5px)",
          }}
        />
        <p className="relative font-display text-[15px] italic text-badge">{prompt}</p>
        <p className="relative mt-2.5 font-display text-[26px] leading-[1.25]">
          {answer}
        </p>
        <a
          href={href}
          className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-badge px-5 py-3 font-pixel text-[10px] uppercase text-ink transition-transform hover:-translate-y-0.5"
        >
          <Ico name="game" size={16} /> {cta}
        </a>
      </div>
    </CardShell>
  );
}
