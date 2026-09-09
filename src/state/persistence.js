const KEY = "arnabs-journey.v1";

export function loadSave() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    return data;
  } catch {
    return null;
  }
}

export function persist(state) {
  try {
    const slim = {
      started: state.started,
      badges: state.badges,
      visited: state.visited,
      playerTile: state.playerTile,
      audioOn: state.audioOn,
    };
    localStorage.setItem(KEY, JSON.stringify(slim));
  } catch {
    /* storage disabled — game still works, just no progress saving */
  }
}

export function clearSave() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
