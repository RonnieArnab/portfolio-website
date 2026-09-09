import { useState } from "react";
import { motion } from "framer-motion";
import Panel from "../components/Panel.jsx";
import PixelButton from "../components/PixelButton.jsx";
import { useGame } from "../state/GameContext.jsx";
import { CREATURES } from "../data/creatures.js";
import { sfx } from "../game/audio.js";

export function CreatureSprite({ color, size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" style={{ imageRendering: "pixelated" }}>
      <rect x="7" y="24" width="18" height="4" fill="#00000022" />
      {/* ears */}
      <polygon points="7,6 11,2 12,10" fill={color} stroke="#0e1a2b" strokeWidth="1" />
      <polygon points="25,6 21,2 20,10" fill={color} stroke="#0e1a2b" strokeWidth="1" />
      {/* body */}
      <rect x="6" y="9" width="20" height="17" rx="8" fill={color} stroke="#0e1a2b" strokeWidth="1.5" />
      {/* belly */}
      <rect x="12" y="16" width="8" height="9" rx="4" fill="#ffffff55" />
      {/* eyes */}
      <circle cx="12" cy="15" r="2" fill="#0e1a2b" />
      <circle cx="20" cy="15" r="2" fill="#0e1a2b" />
      <circle cx="12.7" cy="14.3" r="0.7" fill="#fff" />
      <circle cx="20.7" cy="14.3" r="0.7" fill="#fff" />
      {/* feet */}
      <rect x="9" y="25" width="4" height="3" rx="1" fill={color} stroke="#0e1a2b" strokeWidth="1" />
      <rect x="19" y="25" width="4" height="3" rx="1" fill={color} stroke="#0e1a2b" strokeWidth="1" />
    </svg>
  );
}

function Power({ n }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`power ${n} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 border border-ink ${i < n ? "bg-badge" : "bg-transparent"}`}
        />
      ))}
    </span>
  );
}

export default function RosterScreen() {
  const { dispatch } = useGame();
  const [open, setOpen] = useState(null);
  const close = () => {
    sfx.back();
    dispatch({ type: "BACK_TO_WORLD" });
  };

  return (
    <Panel
      title={`Skill Roster · ${CREATURES.length}`}
      onClose={close}
      maxWidth="max-w-4xl"
      footer={
        <div className="flex items-center justify-between">
          <span className="font-pixel text-[9px] uppercase text-ink/60">
            Every creature = a tool Arnab ships with
          </span>
          <PixelButton onClick={close} className="text-[10px]">◀ Back</PixelButton>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CREATURES.map((c) => (
          <motion.button
            key={c.id}
            layout
            onClick={() => {
              sfx.select();
              setOpen(open === c.id ? null : c.id);
            }}
            className="flex flex-col items-center gap-2 border-4 border-ink bg-wall p-3 text-center hover:bg-parchment"
          >
            <CreatureSprite color={c.color} />
            <span className="font-pixel text-[9px] uppercase leading-tight">
              {c.name}
            </span>
            <span
              className="px-1.5 py-0.5 text-[11px] font-bold uppercase text-ink"
              style={{ background: c.color }}
            >
              {c.type}
            </span>
            <Power n={c.power} />
            <span className="text-sm text-ink/60">{c.skill}</span>
            {open === c.id && (
              <motion.span
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-1 block text-base leading-snug text-ink/80"
              >
                {c.lore}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
    </Panel>
  );
}
