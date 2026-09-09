import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { GameProvider, useGame } from "../state/GameContext.jsx";
import TitleScreen from "../scenes/TitleScreen.jsx";
import Overworld from "../scenes/Overworld.jsx";
import GymScene from "../scenes/GymScene.jsx";
import BadgeCase from "../scenes/BadgeCase.jsx";
import RosterScreen from "../scenes/RosterScreen.jsx";
import ResumeMode from "../scenes/ResumeMode.jsx";

function RpgInner() {
  const { state, dispatch } = useGame();

  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (k === "m" && state.scene === "overworld") {
        dispatch({ type: "GOTO", scene: "badges" });
      } else if (k === "m" && state.scene === "badges") {
        dispatch({ type: "BACK_TO_WORLD" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.scene, dispatch]);

  if (state.scene === "title") return <TitleScreen />;

  return (
    <div className="relative min-h-full">
      <Overworld />

      <AnimatePresence>
        {state.scene === "gym" && <GymScene key="gym" />}
        {state.scene === "badges" && <BadgeCase key="badges" />}
        {state.scene === "roster" && <RosterScreen key="roster" />}
      </AnimatePresence>

      {state.scene === "resume" && (
        <div className="fixed inset-0 z-50">
          <ResumeMode />
        </div>
      )}
    </div>
  );
}

export default function RpgApp() {
  // The game needs the retro shell: dark, pixel fonts, no page scroll.
  useEffect(() => {
    document.body.classList.add("rpg-mode");
    return () => document.body.classList.remove("rpg-mode");
  }, []);

  return (
    <GameProvider>
      <RpgInner />
    </GameProvider>
  );
}
