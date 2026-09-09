// Draws one frame of the overworld: visible tiles, building roofs (coloured per
// building), signs/labels, gym-leader NPCs, and the trainer.

import {
  TILE,
  REGION_COLS,
  REGION_ROWS,
  T,
  buildRegion,
} from "../world/region.js";
import { drawTile, drawTrainer } from "../world/tileset.js";
import { STARTER, GYMS } from "../../data/journey.js";

const STOPS = [STARTER, ...GYMS];

// Precompute building rectangles + roof colour so roofs render solid & tinted.
const BUILDINGS = STOPS.map((s) => {
  const [dx, dy] = s.doorTile;
  const { w, h, roof } = s.building;
  const left = Math.max(1, dx - Math.floor(w / 2));
  const right = Math.min(REGION_COLS - 2, left + w - 1);
  const bottom = dy;
  const top = Math.max(1, bottom - h + 1);
  return { id: s.id, name: s.name, left, right, top, bottom, roof, doorX: dx };
});

export function renderRegion(ctx, cam, view, game, opts = {}) {
  const { tiles } = buildRegion();
  const { camX, camY } = cam;
  const { w: viewW, h: viewH } = view;
  const t = game.time;

  const startCol = Math.max(0, Math.floor(camX / TILE));
  const endCol = Math.min(REGION_COLS - 1, Math.ceil((camX + viewW) / TILE));
  const startRow = Math.max(0, Math.floor(camY / TILE));
  const endRow = Math.min(REGION_ROWS - 1, Math.ceil((camY + viewH) / TILE));

  ctx.fillStyle = "#3f6b3a";
  ctx.fillRect(0, 0, viewW, viewH);

  // ground + props (skip roof/wall here; drawn per-building below)
  for (let y = startRow; y <= endRow; y++) {
    for (let x = startCol; x <= endCol; x++) {
      const code = tiles[y][x];
      const px = Math.round(x * TILE - camX);
      const py = Math.round(y * TILE - camY);
      if (code === T.ROOF || code === T.WALL) {
        drawTile(ctx, T.GRASS, px, py, TILE, t);
        continue;
      }
      drawTile(ctx, code, px, py, TILE, t);
    }
  }

  // buildings
  for (const b of BUILDINGS) {
    const bx = Math.round(b.left * TILE - camX);
    const by = Math.round(b.top * TILE - camY);
    const bw = (b.right - b.left + 1) * TILE;
    const bh = (b.bottom - b.top + 1) * TILE;
    if (bx > viewW || by > viewH || bx + bw < 0 || by + bh < 0) continue;

    const roofH = 2 * TILE;
    // wall
    ctx.fillStyle = "#efe7d2";
    ctx.fillRect(bx, by + roofH, bw, bh - roofH);
    ctx.strokeStyle = "#00000022";
    for (let gx = bx; gx <= bx + bw; gx += TILE) {
      ctx.beginPath();
      ctx.moveTo(gx + 0.5, by + roofH);
      ctx.lineTo(gx + 0.5, by + bh);
      ctx.stroke();
    }
    // roof (trapezoid)
    ctx.fillStyle = b.roof;
    ctx.beginPath();
    ctx.moveTo(bx - 4, by + roofH);
    ctx.lineTo(bx + 8, by);
    ctx.lineTo(bx + bw - 8, by);
    ctx.lineTo(bx + bw + 4, by + roofH);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#00000022";
    ctx.fillRect(bx - 4, by + roofH - 3, bw + 8, 3);

    // door
    const doorPx = Math.round(b.doorX * TILE - camX);
    const doorPy = Math.round(b.bottom * TILE - camY);
    ctx.fillStyle = "#4a2f1c";
    ctx.fillRect(doorPx + 3, doorPy + 2, TILE - 6, TILE - 2);
    ctx.fillStyle = "#d8b451";
    ctx.fillRect(doorPx + TILE - 9, doorPy + TILE / 2, 3, 4);

    // name plaque
    const label = b.name.toUpperCase();
    ctx.font = '6px "Press Start 2P", monospace';
    ctx.textAlign = "center";
    const tw = ctx.measureText(label).width + 10;
    const lx = bx + bw / 2;
    const ly = by + roofH + 10;
    ctx.fillStyle = "#0e1a2b";
    ctx.fillRect(lx - tw / 2, ly - 8, tw, 12);
    ctx.fillStyle = "#f4ecd8";
    ctx.fillText(label, lx, ly + 1);
    ctx.textAlign = "left";

    // gym-leader NPC just left of the door (skip starter)
    if (b.id !== "starter") {
      const npcX = doorPx - TILE;
      const npcY = doorPy - 2 + Math.sin(t / 500 + b.left) * 1.5;
      drawNpc(ctx, npcX, npcY, TILE, b.roof, opts.clearedGyms?.has(b.id));
    }
  }

  // trainer
  const tpx = Math.round(game.player.px - camX);
  const tpy = Math.round(game.player.py - camY);
  drawTrainer(
    ctx,
    tpx,
    tpy,
    TILE,
    game.player.dir,
    game.player.moving ? (Math.floor(t / 120) % 2) : 0
  );

  // soft vignette
  const grd = ctx.createRadialGradient(
    viewW / 2,
    viewH / 2,
    Math.min(viewW, viewH) * 0.3,
    viewW / 2,
    viewH / 2,
    Math.max(viewW, viewH) * 0.75
  );
  grd.addColorStop(0, "rgba(0,0,0,0)");
  grd.addColorStop(1, "rgba(0,0,0,0.28)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, viewW, viewH);
}

function drawNpc(ctx, x, y, s, color, cleared) {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.ellipse(x + s / 2, y + s - 2, s * 0.3, s * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = color;
  ctx.fillRect(x + s * 0.28, y + s * 0.38, s * 0.44, s * 0.3);
  ctx.fillStyle = "#e8b98c";
  ctx.fillRect(x + s * 0.34, y + s * 0.16, s * 0.32, s * 0.26);
  ctx.fillStyle = "#1c1c1c";
  ctx.fillRect(x + s * 0.32, y + s * 0.12, s * 0.36, s * 0.1);
  ctx.fillStyle = "#3a3a44";
  ctx.fillRect(x + s * 0.32, y + s * 0.66, s * 0.36, s * 0.2);

  if (cleared) {
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillStyle = "#f5c542";
    ctx.textAlign = "center";
    ctx.fillText("★", x + s / 2, y - 4);
    ctx.textAlign = "left";
  } else {
    // "!" bubble
    ctx.fillStyle = "#fff";
    ctx.fillRect(x + s * 0.7, y - s * 0.3, s * 0.28, s * 0.24);
    ctx.fillStyle = "#e05a6b";
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillText("!", x + s * 0.8, y - s * 0.12);
  }
}
