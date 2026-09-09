import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TypeWriter from "./TypeWriter.jsx";

// A classic bottom-of-screen dialogue box.
// Press / click once to finish the current line instantly, again to advance.
export default function DialogueBox({ speaker, speakerColor = "#f5c542", lines, onComplete }) {
  const [i, setI] = useState(0);
  const [lineDone, setLineDone] = useState(false);
  const [skip, setSkip] = useState(false);
  const isLast = i >= lines.length - 1;

  const press = () => {
    if (!lineDone && !skip) {
      setSkip(true);
      return;
    }
    if (!lineDone) return;
    if (isLast) onComplete?.();
    else {
      setI((n) => n + 1);
      setLineDone(false);
      setSkip(false);
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " " || e.code === "Space") {
        e.preventDefault();
        press();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center p-3 sm:p-6">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        className="pixel-panel w-full max-w-3xl cursor-pointer px-5 py-4"
        onClick={press}
        role="dialog"
        aria-live="polite"
      >
        {speaker && (
          <p
            className="heading mb-2 flex items-center gap-2 text-xs sm:text-sm"
          >
            <span
              className="inline-block h-3 w-3 border-2 border-ink"
              style={{ background: speakerColor }}
            />
            {speaker}
          </p>
        )}
        <p className="min-h-[3.5rem] text-lg leading-snug sm:text-xl">
          <TypeWriter
            key={i}
            text={lines[i]}
            instant={skip}
            onDone={() => setLineDone(true)}
          />
        </p>
        <p className="mt-1 text-right text-sm text-ink/60">
          {lineDone ? (isLast ? "▶ close" : "▶ next") : "▶ skip"}
        </p>
      </motion.div>
    </div>
  );
}
