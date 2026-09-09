import { useGame } from "../state/GameContext.jsx";
import { totalBadges } from "../state/gameReducer.js";
import { setAudioEnabled } from "../game/audio.js";
import Icon from "./Icon.jsx";

export default function TopBar() {
  const { state, dispatch } = useGame();

  const toggleAudio = async () => {
    const next = !state.audioOn;
    dispatch({ type: "TOGGLE_AUDIO" });
    await setAudioEnabled(next);
  };

  const HudBtn = ({ onClick, label, children, active }) => (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`flex items-center gap-1.5 border-2 border-parchment/40 px-2.5 py-2 font-pixel text-[9px] uppercase transition-colors ${
        active ? "bg-badge text-ink" : "bg-ink/85 text-parchment hover:bg-night"
      }`}
    >
      {children}
    </button>
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between gap-2 p-3">
      <div className="pointer-events-auto flex items-center gap-2 bg-ink/85 border-2 border-parchment/40 px-3 py-2">
        <span className="font-pixel text-[9px] uppercase text-badge">
          Arnab's Journey
        </span>
        <span className="flex items-center gap-1 font-pixel text-[10px] text-parchment">
          <Icon name="star" size={13} className="text-badge" />
          {state.badges.length}/{totalBadges}
        </span>
      </div>

      <nav className="pointer-events-auto flex flex-wrap justify-end gap-1.5">
        <HudBtn
          onClick={() => dispatch({ type: "GOTO", scene: "badges" })}
          label="Open map and badge case"
        >
          <Icon name="map" size={14} />
          <span className="hidden sm:inline">Map</span>
        </HudBtn>
        <HudBtn
          onClick={() => dispatch({ type: "GOTO", scene: "roster" })}
          label="Open skill roster"
        >
          <Icon name="book" size={14} />
          <span className="hidden sm:inline">Roster</span>
        </HudBtn>
        <HudBtn
          onClick={() => dispatch({ type: "GOTO", scene: "resume" })}
          label="Read as a plain résumé"
        >
          <Icon name="doc" size={14} />
          <span className="hidden sm:inline">Résumé</span>
        </HudBtn>
        <HudBtn
          onClick={toggleAudio}
          label={state.audioOn ? "Mute audio" : "Enable audio"}
          active={state.audioOn}
        >
          <Icon name={state.audioOn ? "soundOn" : "soundOff"} size={14} />
        </HudBtn>
      </nav>
    </header>
  );
}
