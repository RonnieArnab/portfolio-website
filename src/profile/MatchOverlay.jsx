import { useMemo } from "react";
import { motion } from "framer-motion";
import Ico from "./Ico.jsx";
import { CONTACT, HEADER } from "../data/profile.js";

const CONFETTI_COLORS = ["#FF5A5F", "#FFB33E", "#2FB574", "#C9A7FF", "#4aa3ff"];

export default function MatchOverlay({ likedLabel, onClose, reduced }) {
  const bits = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        dur: 1.8 + Math.random() * 1.6,
        size: 6 + Math.random() * 8,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rot: Math.random() * 360,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gradient-to-b from-blush to-[#c9243f]"
      />

      {!reduced && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {bits.map((b) => (
            <motion.span
              key={b.id}
              initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
              animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: b.rot }}
              transition={{ duration: b.dur, delay: b.delay, ease: "linear", repeat: Infinity }}
              className="absolute block rounded-[2px]"
              style={{
                left: `${b.x}%`,
                width: b.size,
                height: b.size * 0.6,
                background: b.color,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="It's a match"
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative w-full max-w-[400px] text-center text-white"
      >
        <motion.div
          animate={reduced ? {} : { scale: [1, 1.14, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-white/15 backdrop-blur"
        >
          <Ico name="heart" size={40} className="text-white" />
        </motion.div>

        <h2 className="font-display text-[46px] leading-none">It's a Match!</h2>
        <p className="mx-auto mt-3 max-w-[300px] text-[15px] leading-relaxed text-white/85">
          {likedLabel ? (
            <>
              You liked <span className="font-semibold">“{likedLabel}”</span>.{" "}
              {HEADER.name} is open to work — go say hi.
            </>
          ) : (
            <>{HEADER.name} is open to work. Go say hi.</>
          )}
        </p>

        <div className="mt-7 space-y-2.5">
          {CONTACT.socials.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target={s.id === "email" ? undefined : "_blank"}
              rel="noreferrer"
              className="flex w-full items-center gap-3 rounded-full bg-white px-5 py-3.5 text-left text-ink2 transition-transform hover:-translate-y-0.5"
            >
              <Ico name={s.icon} size={20} className="shrink-0 text-blush" />
              <span className="flex-1 text-[15px] font-semibold">{s.label}</span>
              <span className="truncate text-[13px] text-muted">{s.handle}</span>
            </a>
          ))}

          <a
            href={CONTACT.resume}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center gap-3 rounded-full border-2 border-white/40 px-5 py-3.5 text-left transition-colors hover:bg-white/10"
          >
            <Ico name="doc" size={20} className="shrink-0" />
            <span className="flex-1 text-[15px] font-semibold">Résumé (PDF)</span>
            <Ico name="down" size={17} className="opacity-70" />
          </a>
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-[14px] font-medium text-white/70 underline-offset-4 hover:underline"
        >
          Keep browsing
        </button>
      </motion.div>
    </div>
  );
}
