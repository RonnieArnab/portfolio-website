import Panel from "../components/Panel.jsx";
import PixelButton from "../components/PixelButton.jsx";
import { BadgeMedal } from "./GymScene.jsx";
import { useGame } from "../state/GameContext.jsx";
import { GYMS, STARTER } from "../data/journey.js";
import { REGION_COLS, REGION_ROWS } from "../game/world/region.js";
import { totalBadges } from "../state/gameReducer.js";
import { sfx } from "../game/audio.js";

export default function BadgeCase() {
  const { state, dispatch } = useGame();
  const close = () => {
    sfx.back();
    dispatch({ type: "BACK_TO_WORLD" });
  };

  const earned = state.badges.length;
  const player = state.playerTile;

  const jump = (gym) => {
    // fast-travel straight into the gym; leaving it drops you at its door
    sfx.select();
    dispatch({ type: "ENTER_GYM", gymId: gym.id });
  };

  return (
    <Panel
      title="Map & Badge Case"
      onClose={close}
      maxWidth="max-w-3xl"
      footer={
        <div className="flex items-center justify-between">
          <span className="font-pixel text-[9px] uppercase text-ink/60">
            {earned}/{totalBadges} badges · {Math.round((earned / totalBadges) * 100)}%
          </span>
          <PixelButton onClick={close} className="text-[10px]">
            ◀ Back
          </PixelButton>
        </div>
      }
    >
      <div className="grid gap-5 sm:grid-cols-[220px_1fr]">
        <div>
          <p className="font-pixel text-[9px] uppercase text-ink/60">
            Devroot Region
          </p>
          <svg
            viewBox={`0 0 ${REGION_COLS} ${REGION_ROWS}`}
            className="mt-2 w-full border-4 border-ink bg-grass"
            role="img"
            aria-label="Region map"
          >
            <rect width={REGION_COLS} height={REGION_ROWS} fill="#5b9a4a" />
            {[STARTER, ...GYMS].map((s) => {
              const [x, y] = s.doorTile;
              const done =
                s.id === "starter" || state.badges.includes(s.badge?.id);
              return (
                <g key={s.id}>
                  <rect
                    x={x - 1.6}
                    y={y - 2.4}
                    width={3.2}
                    height={3.2}
                    fill={done ? (s.badge?.color ?? "#c2452d") : "#8a8f98"}
                    stroke="#0e1a2b"
                    strokeWidth={0.4}
                  />
                </g>
              );
            })}
            {player && (
              <circle
                cx={player.x + 0.5}
                cy={player.y + 0.5}
                r={1}
                fill="#f5c542"
                stroke="#0e1a2b"
                strokeWidth={0.4}
              />
            )}
          </svg>
          <p className="mt-1 text-sm text-ink/50">
            ● you · ■ gym (grey = not cleared)
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {GYMS.map((g) => {
            const done = state.badges.includes(g.badge.id);
            return (
              <li key={g.id}>
                <button
                  onClick={() => jump(g)}
                  className="flex w-full flex-col items-center gap-1 border-4 border-ink bg-wall p-2 text-center hover:bg-parchment"
                >
                  <BadgeMedal color={g.badge.color} shape={g.badge.shape} dim={!done} />
                  <span className="font-pixel text-[8px] uppercase leading-tight">
                    {g.badge.name}
                  </span>
                  <span className="text-sm text-ink/50">{g.name}</span>
                  <span className="text-sm text-ink/40">
                    {done ? "cleared" : "travel ▶"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Panel>
  );
}
