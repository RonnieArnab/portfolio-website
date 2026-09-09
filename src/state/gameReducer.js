import { GYMS, STARTER, gymById } from "../data/journey.js";

export const initialState = {
  scene: "title", // title | overworld | gym | badges | roster | resume
  activeGymId: null,
  badges: [], // badge ids
  visited: [], // gym ids
  playerTile: null, // {x,y,dir}
  resumeAt: null, // {x,y,dir} — where GameCanvas should place the player
  audioOn: false,
  reducedMotion: false,
  started: false,
};

function doorFront(gymId) {
  const g = gymId === "starter" ? STARTER : gymById(gymId);
  if (!g) return null;
  const [x, y] = g.doorTile;
  return { x, y: y + 1, dir: 0 };
}

export function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      const s = action.payload || {};
      return {
        ...state,
        started: !!s.started,
        badges: Array.isArray(s.badges) ? s.badges : [],
        visited: Array.isArray(s.visited) ? s.visited : [],
        playerTile: s.playerTile || null,
        audioOn: !!s.audioOn,
        scene: s.started ? "overworld" : "title",
        resumeAt: s.playerTile || null,
      };
    }

    case "SET_REDUCED_MOTION":
      return { ...state, reducedMotion: action.value };

    case "START_GAME":
      return {
        ...state,
        started: true,
        scene: "overworld",
        resumeAt: state.playerTile || null,
      };

    case "GOTO":
      return { ...state, scene: action.scene };

    case "BACK_TO_WORLD":
      return { ...state, scene: "overworld", activeGymId: null };

    case "ENTER_GYM":
      return { ...state, scene: "gym", activeGymId: action.gymId };

    case "CLOSE_GYM": {
      const gymId = state.activeGymId;
      const visited = state.visited.includes(gymId)
        ? state.visited
        : [...state.visited, gymId];
      return {
        ...state,
        scene: "overworld",
        activeGymId: null,
        visited,
        resumeAt: doorFront(gymId),
      };
    }

    case "AWARD_BADGE": {
      if (state.badges.includes(action.badgeId)) return state;
      return { ...state, badges: [...state.badges, action.badgeId] };
    }

    case "SET_TILE":
      return { ...state, playerTile: action.tile, resumeAt: null };

    case "TOGGLE_AUDIO":
      return { ...state, audioOn: !state.audioOn };

    case "NEW_GAME":
      return {
        ...initialState,
        reducedMotion: state.reducedMotion,
        scene: "overworld",
        started: true,
      };

    default:
      return state;
  }
}

export const totalBadges = GYMS.length;
