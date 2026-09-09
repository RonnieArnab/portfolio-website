import { Suspense, lazy, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Panel from "../components/Panel.jsx";
import PixelButton from "../components/PixelButton.jsx";
import DialogueBox from "../components/DialogueBox.jsx";
import Icon from "../components/Icon.jsx";
import { useGame } from "../state/GameContext.jsx";
import { gymById, STARTER } from "../data/journey.js";
import { PROFILE, SOCIALS } from "../data/socials.js";
import { sfx } from "../game/audio.js";

const Showcase = lazy(() => import("../three/Showcase.jsx"));

export default function GymScene() {
  const { state, dispatch } = useGame();
  const isStarter = state.activeGymId === "starter";
  const gym = gymById(state.activeGymId);
  const [phase, setPhase] = useState("intro"); // intro | content | reward

  if (isStarter) return <StarterScene />;
  if (!gym) return null;

  const alreadyCleared = state.badges.includes(gym.badge.id);

  const finishIntro = () => {
    sfx.select();
    setPhase("content");
  };

  const claim = () => {
    if (!alreadyCleared) {
      dispatch({ type: "AWARD_BADGE", badgeId: gym.badge.id });
      sfx.badge();
    } else {
      sfx.select();
    }
    setPhase("reward");
  };

  const close = () => {
    sfx.back();
    dispatch({ type: "CLOSE_GYM" });
  };

  return (
    <AnimatePresence>
      {phase === "intro" && (
        <DialogueBox
          key="intro"
          speaker={`${gym.leader.name} — ${gym.leader.title}`}
          speakerColor={gym.leader.color}
          lines={gym.intro}
          onComplete={finishIntro}
        />
      )}

      {phase === "content" && (
        <Panel
          key="content"
          title={gym.name}
          onClose={close}
          maxWidth="max-w-3xl"
          footer={
            <div className="flex items-center justify-between gap-3">
              <span className="font-pixel text-[9px] uppercase text-ink/60">
                {alreadyCleared ? "Badge already earned" : "Clear this gym"}
              </span>
              <PixelButton onClick={claim} className="text-[10px]">
                {alreadyCleared ? "Review done ▶" : `Take the ${gym.badge.name} ▶`}
              </PixelButton>
            </div>
          }
        >
          <GymBody gym={gym} reducedMotion={state.reducedMotion} />
        </Panel>
      )}

      {phase === "reward" && (
        <Panel key="reward" title="Badge get!" onClose={close} maxWidth="max-w-lg">
          <div className="flex flex-col items-center gap-4 py-2 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 12 }}
            >
              <BadgeMedal color={gym.badge.color} shape={gym.badge.shape} big />
            </motion.div>
            <p className="heading text-sm">{gym.badge.name}</p>
            <p className="text-lg leading-snug text-ink/80">{gym.reward}</p>
            <PixelButton onClick={close} className="mt-2 text-[10px]">
              ◀ Back to the region
            </PixelButton>
          </div>
        </Panel>
      )}
    </AnimatePresence>
  );
}

// ── Starter house: intro + who-is-Arnab card ────────────────────────────────
function StarterScene() {
  const { dispatch } = useGame();
  const [seen, setSeen] = useState(false);
  const close = () => {
    sfx.back();
    dispatch({ type: "CLOSE_GYM" });
  };

  return (
    <AnimatePresence>
      {!seen ? (
        <DialogueBox
          key="s-intro"
          speaker={STARTER.title}
          lines={STARTER.lines}
          onComplete={() => {
            sfx.select();
            setSeen(true);
          }}
        />
      ) : (
        <Panel key="s-card" title="Trainer Card" onClose={close} maxWidth="max-w-xl">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <img
              src={PROFILE.photo}
              alt={PROFILE.name}
              width={112}
              height={112}
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
              className="h-28 w-28 shrink-0 border-4 border-ink object-cover"
            />
            <div className="space-y-1">
              <p className="heading text-base">{PROFILE.name}</p>
              <p className="text-lg text-ink/80">{PROFILE.title}</p>
              <p className="text-base text-ink/60">{PROFILE.tagline}</p>
              <p className="text-base text-ink/50">{PROFILE.location}</p>
            </div>
          </div>
          <p className="mt-4 text-lg leading-snug">
            Six gyms wait to the north. Each one is a real milestone — education,
            a role, shipped projects, the full skill roster, and a way to reach me.
            Beat them in any order; your badges save automatically.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target={s.id === "email" ? undefined : "_blank"}
                rel="noreferrer"
                className="pixel-btn inline-flex items-center gap-2 text-[9px]"
              >
                <Icon name={s.icon} size={14} /> {s.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <PixelButton onClick={close} className="text-[10px]">
              ▶ Start exploring
            </PixelButton>
          </div>
        </Panel>
      )}
    </AnimatePresence>
  );
}

// ── Badge medal (pure SVG) ──────────────────────────────────────────────────
export function BadgeMedal({ color = "#f5c542", shape = "ball", big = false, dim = false }) {
  const s = big ? 96 : 40;
  const glyph = {
    book: "M6 5h5v14H6zM13 5h5v14h-5z",
    anvil: "M4 8h12l-2 4h4l-4 5H8l1-3H5z",
    compass: "M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3z",
    quill: "M5 19c6-1 10-5 13-14-6 2-11 6-13 14zM5 19l3-3",
    ball: "M3 12h18M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z",
    signal: "M4 20a12 12 0 0 1 16 0M8 20a6 6 0 0 1 8 0M11 20h2",
  }[shape] || "M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3z";

  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      className={dim ? "opacity-25 grayscale" : ""}
      aria-hidden="true"
    >
      <polygon
        points="12,1 15,4 20,4 20,9 23,12 20,15 20,20 15,20 12,23 9,20 4,20 4,15 1,12 4,9 4,4 9,4"
        fill={color}
        stroke="#0e1a2b"
        strokeWidth="1.5"
      />
      <path
        d={glyph}
        fill="none"
        stroke="#0e1a2b"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── The varying content body ────────────────────────────────────────────────
function GymBody({ gym, reducedMotion }) {
  const c = gym.content;
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1 border-b-4 border-ink/20 pb-3">
        <p className="heading text-base sm:text-lg">{c.headline}</p>
        {c.subhead && <p className="text-lg text-ink/70">{c.subhead}</p>}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-base text-ink/60">
          {c.dateRange && <span>🗓 {c.dateRange}</span>}
          {c.stat && (
            <span className="font-pixel text-[10px] text-ink">
              {c.stat.label}: {c.stat.value}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="space-y-4">
          {c.bullets && (
            <ul className="space-y-2">
              {c.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-lg leading-snug">
                  <span className="text-badge">◆</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {c.floors && (
            <ol className="space-y-3">
              {c.floors.map((f, i) => (
                <li key={i} className="border-l-4 border-badge pl-3">
                  <p className="font-pixel text-[10px] uppercase text-ink">
                    {f.title}
                  </p>
                  <p className="text-lg leading-snug text-ink/80">{f.body}</p>
                </li>
              ))}
            </ol>
          )}

          {c.groups && (
            <div className="space-y-3">
              {c.groups.map((g) => (
                <div key={g.label}>
                  <p className="font-pixel text-[9px] uppercase text-ink/60">
                    {g.label}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="border-2 border-ink bg-wall px-2 py-0.5 text-base"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {c.stack && (
            <div className="flex flex-wrap gap-1.5">
              {c.stack.map((t) => (
                <span
                  key={t}
                  className="border-2 border-ink bg-ink px-2 py-0.5 text-base text-parchment"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {c.tags && (
            <div className="flex flex-wrap gap-1.5">
              {c.tags.map((t) => (
                <span key={t} className="text-base text-ink/50">
                  #{t.replace(/\s+/g, "")}
                </span>
              ))}
            </div>
          )}

          {c.links && (
            <div className="flex flex-wrap gap-2 pt-1">
              {c.links.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-btn pixel-btn-lite inline-flex items-center gap-2 text-[9px]"
                >
                  <Icon name="gh" size={14} /> {l.label}
                </a>
              ))}
            </div>
          )}

          {gym.isContact && <ContactBlock />}
        </div>

        <div className="w-full sm:w-56">
          <Suspense
            fallback={
              <div className="grid h-48 place-items-center border-4 border-ink/20 text-base text-ink/40">
                loading 3D…
              </div>
            }
          >
            <Showcase
              kind={gym.showcase}
              color={gym.badge.color}
              reducedMotion={reducedMotion}
            />
          </Suspense>
          <p className="mt-1 text-center text-sm text-ink/40">
            drag to rotate
          </p>
        </div>
      </div>
    </div>
  );
}

function ContactBlock() {
  return (
    <div className="space-y-3 border-t-4 border-ink/20 pt-4">
      <div className="flex flex-wrap gap-2">
        {SOCIALS.map((s) => (
          <a
            key={s.id}
            href={s.url}
            target={s.id === "email" ? undefined : "_blank"}
            rel="noreferrer"
            className="pixel-btn inline-flex items-center gap-2 text-[9px]"
          >
            <Icon name={s.icon} size={14} /> {s.label}
          </a>
        ))}
        <a
          href={PROFILE.resume}
          target="_blank"
          rel="noreferrer"
          className="pixel-btn pixel-btn-lite inline-flex items-center gap-2 text-[9px]"
        >
          <Icon name="doc" size={14} /> Résumé PDF
        </a>
      </div>
      <p className="text-base text-ink/60">
        {PROFILE.email} · {PROFILE.location}
      </p>
    </div>
  );
}
