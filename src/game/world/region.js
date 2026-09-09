// Procedurally assembles the "Devroot Region" overworld from journey.js data.
// One region, one screen-scrolling map. No external map editor — everything is
// derived here so the whole world moves when you edit journey.js.

import { STARTER, GYMS } from "../../data/journey.js";

export const TILE = 40;
export const REGION_COLS = 44;
export const REGION_ROWS = 34;

export const T = {
  GRASS: 0,
  GRASS_ALT: 1,
  PATH: 2,
  TREE: 3,
  WATER: 4,
  FLOWER: 5,
  WALL: 6,
  ROOF: 7,
  DOOR: 8,
  SIGN: 9,
  FENCE: 10,
};

const SOLID_TILES = new Set([T.TREE, T.WATER, T.WALL, T.ROOF, T.FENCE]);

const key = (x, y) => `${x},${y}`;
const inBounds = (x, y) =>
  x >= 0 && y >= 0 && x < REGION_COLS && y < REGION_ROWS;

function carveCell(tiles, x, y) {
  if (!inBounds(x, y)) return;
  if (y === 0 || x === 0 || y === REGION_ROWS - 1 || x === REGION_COLS - 1) return;
  // paths cut through anything that isn't a building (trees, flowers, meadow)
  if (tiles[y][x] !== T.WATER) tiles[y][x] = T.PATH;
}

function carvePath(tiles, [ax, ay], [bx, by]) {
  // L-shaped corridor: horizontal then vertical.
  let x = ax;
  const stepX = ax < bx ? 1 : -1;
  while (x !== bx) {
    carveCell(tiles, x, ay);
    x += stepX;
  }
  let y = ay;
  const stepY = ay < by ? 1 : -1;
  while (y !== by) {
    carveCell(tiles, bx, y);
    y += stepY;
  }
  carveCell(tiles, bx, by);
}

function stampBuilding(tiles, doors, stop) {
  const [dx, dy] = stop.doorTile;
  const { w, h } = stop.building;
  const left = Math.max(1, dx - Math.floor(w / 2));
  const right = Math.min(REGION_COLS - 2, left + w - 1);
  const bottom = dy; // door row is the bottom wall row
  const top = Math.max(1, bottom - h + 1);

  for (let y = top; y <= bottom; y++) {
    for (let x = left; x <= right; x++) {
      if (!inBounds(x, y)) continue;
      tiles[y][x] = y <= top + 1 ? T.ROOF : T.WALL;
    }
  }
  // door
  tiles[bottom][dx] = T.DOOR;
  doors.set(key(dx, dy), stop.id);
  // welcome mat / path stub in front of the door
  if (inBounds(dx, dy + 1)) tiles[dy + 1][dx] = T.PATH;
  // a sign beside the door
  if (inBounds(dx + 2, dy) && tiles[dy][dx + 2] !== T.WALL)
    tiles[dy][dx + 2] = T.SIGN;
}

let cached = null;

export function buildRegion() {
  if (cached) return cached;

  const rng = mulberry32(20260909);
  const tiles = Array.from({ length: REGION_ROWS }, () =>
    Array.from({ length: REGION_COLS }, () => T.GRASS)
  );

  // texture the grass + scatter flowers (sparse, so it reads as meadow not grid)
  for (let y = 0; y < REGION_ROWS; y++) {
    for (let x = 0; x < REGION_COLS; x++) {
      const r = rng();
      if (r > 0.93) tiles[y][x] = T.GRASS_ALT;
      else if (r > 0.915) tiles[y][x] = T.FLOWER;
    }
  }

  // tree border
  for (let x = 0; x < REGION_COLS; x++) {
    tiles[0][x] = T.TREE;
    tiles[REGION_ROWS - 1][x] = T.TREE;
  }
  for (let y = 0; y < REGION_ROWS; y++) {
    tiles[y][0] = T.TREE;
    tiles[y][REGION_COLS - 1] = T.TREE;
  }

  // a pond on the east side
  for (let y = 25; y <= 31; y++) {
    for (let x = 33; x <= 41; x++) {
      const edge = x === 33 || x === 41 || y === 25 || y === 31;
      if (edge && rng() > 0.5) continue;
      tiles[y][x] = T.WATER;
    }
  }

  // scattered tree clumps for cover (avoid the center where the path runs)
  for (let i = 0; i < 46; i++) {
    const x = 2 + Math.floor(rng() * (REGION_COLS - 4));
    const y = 2 + Math.floor(rng() * (REGION_ROWS - 4));
    tiles[y][x] = T.TREE;
  }

  const doors = new Map();
  const stops = [STARTER, ...GYMS].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  // connect the stops with a path, in order
  for (let i = 0; i < stops.length - 1; i++) {
    carvePath(tiles, stops[i].doorTile, stops[i + 1].doorTile);
  }

  // now stamp the buildings (after the path so doors sit on the path)
  for (const stop of stops) stampBuilding(tiles, doors, stop);

  // spawn: just south of the starter house door
  const [sx, sy] = STARTER.doorTile;
  const spawn = { x: sx, y: Math.min(REGION_ROWS - 2, sy + 2) };
  tiles[spawn.y][spawn.x] = T.PATH;

  // build the collision grid
  const solid = Array.from({ length: REGION_ROWS }, (_, y) =>
    Array.from({ length: REGION_COLS }, (_, x) => SOLID_TILES.has(tiles[y][x]))
  );

  cached = { tiles, solid, doors, spawn };
  return cached;
}

export function isSolid(x, y) {
  const { solid } = buildRegion();
  if (!inBounds(x, y)) return true;
  return solid[y][x];
}

export function doorAt(x, y) {
  const { doors } = buildRegion();
  return doors.get(key(x, y)) || null;
}

// tiny deterministic PRNG so the map is identical every load
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
