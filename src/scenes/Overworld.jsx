import { useMemo, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GameCanvas from "../game/GameCanvas.jsx";
import TopBar from "../components/TopBar.jsx";
import DPad from "../components/DPad.jsx";
import { useGame } from "../state/GameContext.jsx";
import { GYMS, gymById } from "../data/journey.js";
import { sfx } from "../game/audio.js";

export default function Overworld() {
  const { state, dispatch } = useGame();
  const [nearDoor, setNearDoor] = useState(null);
  const lastTile = useRef("");

  const clearedGyms = useMemo(() => {
    const s = new Set();
    for (const g of GYMS) if (state.badges.includes(g.badge.id)) s.add(g.id);
    return s;
  }, [state.badges]);

  const paused = state.scene !== "overworld";

  const handleEnter = (gymId) => {
    if (state.scene !== "overworld") return;
    sfx.enter();
    dispatch({ type: "ENTER_GYM", gymId });
  };

  const handleTile = (tile) => {
    const k = `${tile.x},${tile.y}`;
    if (k !== lastTile.current) {
      lastTile.current = k;
      sfx.move();
      dispatch({ type: "SET_TILE", tile });
    }
  };

  const near = nearDoor ? gymById(nearDoor) : null;

  return (
    <div className="relative min-h-full">
      <GameCanvas
        paused={paused}
        resumeAt={state.resumeAt}
        clearedGyms={clearedGyms}
        onEnterGym={handleEnter}
        onTileChange={handleTile}
        onNearDoor={setNearDoor}
      />

      <TopBar />
      <DPad />

      <AnimatePresence>
        {near && !paused && (
          <motion.div
            key={near.id}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            className="pointer-events-none fixed inset-x-0 bottom-24 z-20 flex justify-center px-4 md:bottom-10"
          >
            <div className="bg-ink/90 border-2 border-badge px-4 py-2 font-pixel text-[10px] uppercase text-parchment">
              {near.name}
              <span className="ml-2 text-badge">▲ walk in</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
