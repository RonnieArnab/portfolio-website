import { motion } from "framer-motion";
import { useGame } from "../state/GameContext.jsx";
import { totalBadges } from "../state/gameReducer.js";
import { clearSave } from "../state/persistence.js";
import { sfx } from "../game/audio.js";
import PixelButton from "../components/PixelButton.jsx";
import { PROFILE } from "../data/socials.js";

export default function TitleScreen() {
  const { state, dispatch } = useGame();
  const hasSave = state.badges.length > 0 || state.playerTile;

  const start = () => {
    sfx.select();
    dispatch({ type: "START_GAME" });
  };
  const newGame = () => {
    sfx.select();
    clearSave();
    dispatch({ type: "NEW_GAME" });
  };

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#1c3a5e,#0e1a2b_70%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#ffffff0f 0 2px,transparent 2px 6px)",
        }}
      />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <p className="font-pixel text-[10px] uppercase tracking-[0.3em] text-badge">
          A portfolio you can play
        </p>
        <h1 className="font-pixel text-2xl leading-relaxed text-parchment sm:text-4xl">
          Arnab's
          <br />
          <span className="text-badge">Journey</span>
        </h1>
        <p className="max-w-md text-xl text-parchment/80">
          {PROFILE.name} — {PROFILE.title}. Walk the Devroot Region, challenge{" "}
          {totalBadges} career-milestone gyms, collect every badge.
        </p>

        <div className="mt-2 flex flex-col items-center gap-3">
          <PixelButton onClick={start} className="animate-bob text-xs">
            {hasSave ? "▶ Continue" : "▶ Start the journey"}
          </PixelButton>
          {hasSave && (
            <button
              onClick={newGame}
              className="font-pixel text-[9px] uppercase text-parchment/50 hover:text-parchment"
            >
              New game (clear progress)
            </button>
          )}
        </div>

        <p className="mt-4 font-pixel text-[8px] uppercase leading-loose text-parchment/40">
          Arrow keys / WASD to move · Enter to advance · M for map
          <br />
          Prefer to just read? Hit “Résumé” once you’re inside.
        </p>
      </motion.div>
    </div>
  );
}
