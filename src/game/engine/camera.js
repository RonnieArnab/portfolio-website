import { TILE, REGION_COLS, REGION_ROWS } from "../world/region.js";

// Returns the top-left world pixel the viewport should show, clamped so the
// camera never reveals area outside the region.
export function computeCamera(playerPx, playerPy, viewW, viewH) {
  const worldW = REGION_COLS * TILE;
  const worldH = REGION_ROWS * TILE;

  let camX = playerPx + TILE / 2 - viewW / 2;
  let camY = playerPy + TILE / 2 - viewH / 2;

  camX = clamp(camX, 0, Math.max(0, worldW - viewW));
  camY = clamp(camY, 0, Math.max(0, worldH - viewH));

  // if the world is smaller than the viewport, centre it
  if (worldW < viewW) camX = (worldW - viewW) / 2;
  if (worldH < viewH) camY = (worldH - viewH) / 2;

  return { camX, camY };
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}
