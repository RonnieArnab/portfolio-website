import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { reducer, initialState } from "./gameReducer.js";
import { loadSave, persist } from "./persistence.js";

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const hydrated = useRef(false);

  // hydrate once from localStorage
  useEffect(() => {
    const saved = loadSave();
    if (saved) dispatch({ type: "HYDRATE", payload: saved });
    hydrated.current = true;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () =>
      dispatch({ type: "SET_REDUCED_MOTION", value: mq.matches });
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // persist on relevant changes
  useEffect(() => {
    if (!hydrated.current) return;
    persist(state);
  }, [state.started, state.badges, state.visited, state.playerTile, state.audioOn, state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside <GameProvider>");
  return ctx;
}
