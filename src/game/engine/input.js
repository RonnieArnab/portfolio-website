// Keyboard + virtual D-pad input.
//
// Movement needs to feel right for BOTH styles of play:
//  - holding a key to walk continuously
//  - tapping a key once to step a single tile
// So each direction stays "active" for a short minimum window after a keydown,
// even if the keyup arrives almost immediately (fast taps, synthetic events).

const HELD = { up: false, down: false, left: false, right: false };
const UNTIL = { up: 0, down: 0, left: 0, right: 0 };
const MIN_ACTIVE_MS = 140;

let actionQueued = false;
let lastDir = null;

const KEY_MAP = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  KeyW: "up",
  KeyS: "down",
  KeyA: "left",
  KeyD: "right",
};
const ACTION_KEYS = new Set(["Enter", "Space", "KeyE"]);

let attached = false;

function press(dir) {
  HELD[dir] = true;
  UNTIL[dir] = performance.now() + MIN_ACTIVE_MS;
  lastDir = dir;
}
function release(dir) {
  HELD[dir] = false;
}

function onKeyDown(e) {
  const dir = KEY_MAP[e.code];
  if (dir) {
    press(dir);
    e.preventDefault();
  }
  if (ACTION_KEYS.has(e.code)) {
    actionQueued = true;
    e.preventDefault();
  }
}
function onKeyUp(e) {
  const dir = KEY_MAP[e.code];
  if (dir) {
    release(dir);
    e.preventDefault();
  }
}

export function attachInput() {
  if (attached) return;
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  attached = true;
}

export function detachInput() {
  window.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("keyup", onKeyUp);
  attached = false;
  resetInput();
}

export function resetInput() {
  for (const k of Object.keys(HELD)) {
    HELD[k] = false;
    UNTIL[k] = 0;
  }
  actionQueued = false;
  lastDir = null;
}

// D-pad buttons
export function setDir(dir, active) {
  if (!(dir in HELD)) return;
  if (active) press(dir);
  else release(dir);
}
export function queueAction() {
  actionQueued = true;
}

// Returns the direction the player should try to move this frame, or null.
export function pollDirection() {
  const now = performance.now();
  const active = (d) => HELD[d] || now < UNTIL[d];
  // prefer the most recently pressed direction if it's still active
  if (lastDir && active(lastDir)) return lastDir;
  for (const d of ["up", "down", "left", "right"]) if (active(d)) return d;
  return null;
}

export function consumeAction() {
  if (actionQueued) {
    actionQueued = false;
    return true;
  }
  return false;
}
