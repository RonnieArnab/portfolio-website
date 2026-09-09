import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Ico from "./Ico.jsx";
import AgentChat from "./AgentChat.jsx";
import MatchOverlay from "./MatchOverlay.jsx";
import {
  HeroCard,
  VitalsCard,
  PromptCard,
  ProjectCard,
  ExperienceCard,
  SkillsCard,
  EducationCard,
  SecretCard,
} from "./Cards.jsx";
import { CARDS, HEADER, CONTACT } from "../data/profile.js";

const AmbientScene = lazy(() => import("../three/AmbientScene.jsx"));

const PASS_LINES = [
  "Ouch. Want to reconsider?",
  "Bold. He does exactly-once processing, you know.",
  "Still here though? Thought so.",
  "Fine — but the RPG at the bottom is genuinely fun.",
];

export default function ProfileApp() {
  const reduced = useReducedMotion();
  const [liked, setLiked] = useState(() => new Set());
  const [sheet, setSheet] = useState(null); // null | "chat" | "match"
  const [matchLabel, setMatchLabel] = useState(null);
  const [passIdx, setPassIdx] = useState(-1);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.remove("rpg-mode");
    const onScroll = () => setScrolled(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const like = useCallback((cardId, label) => {
    setLiked((s) => new Set(s).add(cardId));
    setMatchLabel(label);
    setSheet("match");
  }, []);

  const pass = () => setPassIdx((i) => (i + 1) % PASS_LINES.length);

  useEffect(() => {
    if (passIdx < 0) return;
    const t = setTimeout(() => setPassIdx(-1), 2600);
    return () => clearTimeout(t);
  }, [passIdx]);

  const renderCard = (card) => {
    const onLike = (label) => like(card.id, label);
    const isLiked = liked.has(card.id);

    switch (card.kind) {
      case "hero":
        return <HeroCard onLike={onLike} liked={isLiked} />;
      case "vitals":
        return <VitalsCard />;
      case "prompt":
        return (
          <PromptCard
            prompt={card.prompt}
            answer={card.answer}
            onLike={onLike}
            liked={isLiked}
          />
        );
      case "project":
        return (
          <ProjectCard
            project={card.project}
            blurb={card.blurb}
            onLike={onLike}
            liked={isLiked}
          />
        );
      case "experience":
        return (
          <ExperienceCard
            company={card.company}
            role={card.role}
            dates={card.dates}
            floors={card.floors}
            onLike={onLike}
            liked={isLiked}
          />
        );
      case "skills":
        return <SkillsCard groups={card.groups} />;
      case "education":
        return (
          <EducationCard
            school={card.school}
            degree={card.degree}
            dates={card.dates}
            stat={card.stat}
          />
        );
      case "secret":
        return (
          <SecretCard
            prompt={card.prompt}
            answer={card.answer}
            cta={card.cta}
            href={card.href}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-full">
      {/* 3D atmosphere — background only, deliberately faint */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.55]">
        <Suspense fallback={null}>
          <AmbientScene reduced={!!reduced} />
        </Suspense>
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-cream/80 via-cream/60 to-cream/90" />
      {/* keeps the centre column clean on wide screens */}
      <div className="pointer-events-none fixed inset-y-0 left-1/2 z-0 w-[560px] -translate-x-1/2 bg-cream/55 blur-2xl" />

      {/* sticky mini header */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className="fixed inset-x-0 top-0 z-30 border-b border-hush/70 bg-cream/85 backdrop-blur-md"
          >
            <div className="mx-auto flex max-w-[440px] items-center gap-3 px-5 py-3">
              <img
                src={HEADER.photo}
                alt=""
                className="h-9 w-9 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-ink2">
                  {HEADER.fullName}
                </p>
                <p className="truncate text-[12px] text-muted">{HEADER.role}</p>
              </div>
              <a
                href={CONTACT.resume}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-ink2 px-3.5 py-2 text-[12.5px] font-semibold text-cream"
              >
                Résumé
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* deck */}
      <main className="relative z-10 mx-auto w-full max-w-[440px] px-4 pb-40 pt-6">
        <p className="mb-4 text-center text-[12px] font-medium uppercase tracking-[0.2em] text-muted/80">
          Software engineer · 1 of 1 nearby
        </p>

        <div className="space-y-6">
          {CARDS.map((card) => (
            <div key={card.id}>{renderCard(card)}</div>
          ))}
        </div>

        <footer className="mt-10 text-center text-[12.5px] leading-relaxed text-muted/80">
          <p>
            Built by {HEADER.fullName} — React, React Three Fiber, and an
            Anthropic-powered agent.
          </p>
          <p className="mt-1">
            <a
              href="https://github.com/RonnieArnab/portfolio-website"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-blush"
            >
              Source
            </a>
            {" · "}
            <a href="/rpg" className="underline underline-offset-2 hover:text-blush">
              Play the RPG version
            </a>
          </p>
        </footer>
      </main>

      {/* action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center pb-6 pt-10 bg-gradient-to-t from-cream via-cream/85 to-transparent">
        <div className="flex items-center gap-4">
          <button
            onClick={pass}
            aria-label="Pass"
            className="round-btn h-14 w-14 text-muted"
          >
            <Ico name="x" size={26} />
          </button>

          <button
            onClick={() => setSheet("chat")}
            className="round-btn h-16 gap-2 rounded-full px-6 text-ink2"
          >
            <span className="flex items-center gap-2">
              <Ico name="chat" size={21} className="text-blush" />
              <span className="text-[14.5px] font-semibold">Ask about me</span>
            </span>
          </button>

          <button
            onClick={() => {
              setMatchLabel(null);
              setSheet("match");
            }}
            aria-label="Like"
            className="round-btn h-14 w-14 bg-blush text-white shadow-heart"
          >
            <Ico name="heart" size={24} />
          </button>
        </div>
      </div>

      {/* pass toast */}
      <AnimatePresence>
        {passIdx >= 0 && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-28 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink2 px-5 py-2.5 text-[13.5px] font-medium text-cream shadow-lift"
          >
            {PASS_LINES[passIdx]}
          </motion.p>
        )}
      </AnimatePresence>

      {/* overlays */}
      <AnimatePresence>
        {sheet === "chat" && <AgentChat key="chat" onClose={() => setSheet(null)} />}
        {sheet === "match" && (
          <MatchOverlay
            key="match"
            likedLabel={matchLabel}
            reduced={!!reduced}
            onClose={() => setSheet(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
