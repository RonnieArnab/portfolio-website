// Procedural tile + sprite drawing. Zero external images required — this keeps the
// site building even before the CC0 art packs are vendored in. Swap these routines
// for spritesheet blits later without touching the engine.

import { T } from "./region.js";

const PALETTE = {
  grass: "#5b9a4a",
  grassAlt: "#6fae57",
  grassBlade: "#4a7f3c",
  path: "#d9c9a0",
  pathEdge: "#c3b08a",
  tree: "#2f6b34",
  treeDark: "#255728",
  trunk: "#6b4b2a",
  water: "#3f79b8",
  waterHi: "#5b93cf",
  flower: "#e7d98a",
  petal: "#e05a6b",
  wall: "#efe7d2",
  wallLine: "#cbbfa0",
  door: "#5a3a22",
  sign: "#8a5a34",
};

function fill(ctx, c, x, y, w, h) {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
}

export function drawTile(ctx, code, px, py, s, t) {
  // base grass under everything
  fill(ctx, PALETTE.grass, px, py, s, s);

  switch (code) {
    case T.GRASS:
      break;
    case T.GRASS_ALT:
      fill(ctx, PALETTE.grassAlt, px, py, s, s);
      fill(ctx, PALETTE.grassBlade, px + s * 0.2, py + s * 0.55, s * 0.12, s * 0.28);
      fill(ctx, PALETTE.grassBlade, px + s * 0.62, py + s * 0.4, s * 0.12, s * 0.32);
      break;
    case T.FLOWER:
      fill(ctx, PALETTE.grassAlt, px, py, s, s);
      fill(ctx, PALETTE.petal, px + s * 0.4, py + s * 0.32, s * 0.2, s * 0.2);
      fill(ctx, PALETTE.flower, px + s * 0.46, py + s * 0.38, s * 0.08, s * 0.08);
      break;
    case T.PATH:
      fill(ctx, PALETTE.path, px, py, s, s);
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(px, py, s, 2);
      ctx.fillRect(px, py, 2, s);
      break;
    case T.TREE: {
      // grass base, then a round canopy + trunk
      fill(ctx, PALETTE.trunk, px + s * 0.42, py + s * 0.6, s * 0.16, s * 0.4);
      ctx.fillStyle = PALETTE.treeDark;
      circle(ctx, px + s / 2, py + s * 0.42, s * 0.44);
      ctx.fillStyle = PALETTE.tree;
      circle(ctx, px + s / 2, py + s * 0.38, s * 0.36);
      break;
    }
    case T.WATER: {
      fill(ctx, PALETTE.water, px, py, s, s);
      const wob = Math.sin((t / 400 + (px + py) / 40)) * 2;
      ctx.fillStyle = PALETTE.waterHi;
      ctx.fillRect(px + s * 0.15 + wob, py + s * 0.3, s * 0.3, 2);
      ctx.fillRect(px + s * 0.55 - wob, py + s * 0.62, s * 0.25, 2);
      break;
    }
    case T.WALL:
      fill(ctx, PALETTE.wall, px, py, s, s);
      ctx.strokeStyle = PALETTE.wallLine;
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 0.5, py + 0.5, s - 1, s - 1);
      break;
    case T.ROOF:
      fill(ctx, "#00000022", px, py, s, s);
      break; // roof colour is painted per-building in renderer
    case T.DOOR:
      fill(ctx, PALETTE.wall, px, py, s, s);
      fill(ctx, PALETTE.door, px + s * 0.2, py + s * 0.15, s * 0.6, s * 0.85);
      fill(ctx, "#d8b451", px + s * 0.62, py + s * 0.5, s * 0.08, s * 0.12);
      break;
    case T.SIGN:
      fill(ctx, PALETTE.trunk, px + s * 0.44, py + s * 0.45, s * 0.12, s * 0.5);
      fill(ctx, PALETTE.sign, px + s * 0.18, py + s * 0.12, s * 0.64, s * 0.42);
      ctx.fillStyle = "#3d2a17";
      ctx.fillRect(px + s * 0.26, py + s * 0.22, s * 0.48, 2);
      ctx.fillRect(px + s * 0.26, py + s * 0.3, s * 0.4, 2);
      break;
    case T.FENCE:
      fill(ctx, PALETTE.trunk, px + s * 0.1, py + s * 0.3, s * 0.8, s * 0.14);
      fill(ctx, PALETTE.trunk, px + s * 0.2, py + s * 0.2, s * 0.12, s * 0.6);
      fill(ctx, PALETTE.trunk, px + s * 0.68, py + s * 0.2, s * 0.12, s * 0.6);
      break;
    default:
      break;
  }
}

function circle(ctx, cx, cy, r) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
}

// ── Trainer sprite ──────────────────────────────────────────────────────────
// dir: 0 down, 1 left, 2 right, 3 up. step: 0/1 walk cycle.
export function drawTrainer(ctx, px, py, s, dir, step) {
  const skin = "#e8b98c";
  const hair = "#221812";
  const shirt = "#1f3b63";
  const shirtHi = "#2f5488";
  const pants = "#3a3a44";
  const shoe = "#111";

  const bob = step ? 1 : 0;
  const x = px;
  const y = py + bob;

  // shadow
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.ellipse(x + s / 2, py + s - 2, s * 0.32, s * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();

  // legs
  fill(ctx, pants, x + s * 0.3, y + s * 0.62, s * 0.16, s * 0.24);
  fill(ctx, pants, x + s * 0.54, y + s * 0.62, s * 0.16, s * 0.24);
  fill(ctx, shoe, x + s * 0.28, y + s * 0.84, s * 0.2, s * 0.1);
  fill(ctx, shoe, x + s * 0.52, y + s * 0.84, s * 0.2, s * 0.1);

  // torso
  fill(ctx, shirt, x + s * 0.26, y + s * 0.4, s * 0.48, s * 0.26);
  fill(ctx, shirtHi, x + s * 0.26, y + s * 0.4, s * 0.48, s * 0.06);

  // arms (swing with step)
  const swing = step ? s * 0.04 : -s * 0.04;
  fill(ctx, shirt, x + s * 0.18, y + s * 0.42 + swing, s * 0.1, s * 0.2);
  fill(ctx, shirt, x + s * 0.72, y + s * 0.42 - swing, s * 0.1, s * 0.2);

  // head
  fill(ctx, skin, x + s * 0.32, y + s * 0.16, s * 0.36, s * 0.28);
  // hair
  fill(ctx, hair, x + s * 0.3, y + s * 0.12, s * 0.4, s * 0.14);
  if (dir === 3) {
    // facing up: back of head
    fill(ctx, hair, x + s * 0.3, y + s * 0.12, s * 0.4, s * 0.28);
  } else if (dir === 0) {
    // eyes
    fill(ctx, "#1a1a1a", x + s * 0.4, y + s * 0.3, s * 0.05, s * 0.05);
    fill(ctx, "#1a1a1a", x + s * 0.55, y + s * 0.3, s * 0.05, s * 0.05);
  } else {
    const ex = dir === 1 ? 0.38 : 0.55;
    fill(ctx, "#1a1a1a", x + s * ex, y + s * 0.3, s * 0.06, s * 0.05);
  }
}

export const ROOF_FOR = {}; // filled by renderer per building id
