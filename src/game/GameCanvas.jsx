import { useEffect, useRef } from "react";
import {
  TILE,
  buildRegion,
  isSolid,
  doorAt,
} from "./world/region.js";
import { computeCamera } from "./engine/camera.js";
import { renderRegion } from "./engine/renderer.js";
import {
  attachInput,
  detachInput,
  pollDirection,
  consumeAction,
} from "./engine/input.js";

const STEP_MS = 150; // time to cross one tile

export default function GameCanvas({
  paused = false,
  resumeAt = null,
  clearedGyms,
  onEnterGym,
  onTileChange,
  onNearDoor,
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const gameRef = useRef(null);
  const rafRef = useRef(0);
  const pausedRef = useRef(paused);

  pausedRef.current = paused;

  // init game object once
  if (!gameRef.current) {
    const { spawn } = buildRegion();
    const start = resumeAt || spawn;
    gameRef.current = {
      time: 0,
      player: {
        tx: start.x,
        ty: start.y,
        px: start.x * TILE,
        py: start.y * TILE,
        dir: start.dir ?? 0,
        moving: false,
        fromX: 0,
        fromY: 0,
        toX: 0,
        toY: 0,
        progress: 0,
      },
    };
  }

  // external reposition (returning from a gym / new game)
  useEffect(() => {
    if (!resumeAt) return;
    const p = gameRef.current.player;
    p.tx = resumeAt.x;
    p.ty = resumeAt.y;
    p.px = resumeAt.x * TILE;
    p.py = resumeAt.y * TILE;
    p.dir = resumeAt.dir ?? 0;
    p.moving = false;
    p.progress = 0;
  }, [resumeAt]);

  useEffect(() => {
    attachInput();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    let view = { w: 0, h: 0 };

    const resize = () => {
      const wrap = wrapRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrap.getBoundingClientRect();
      view = { w: Math.floor(rect.width), h: Math.floor(rect.height) };
      canvas.width = view.w * dpr;
      canvas.height = view.h * dpr;
      canvas.style.width = view.w + "px";
      canvas.style.height = view.h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };
    resize();
    window.addEventListener("resize", resize);

    let last = performance.now();

    const update = (dt) => {
      const g = gameRef.current;
      g.time += dt;
      const p = g.player;

      if (!pausedRef.current) {
        if (p.moving) {
          p.progress += dt / STEP_MS;
          if (p.progress >= 1) {
            p.progress = 0;
            p.moving = false;
            p.px = p.toX * TILE;
            p.py = p.toY * TILE;
            p.tx = p.toX;
            p.ty = p.toY;
            onTileChange?.({ x: p.tx, y: p.ty, dir: p.dir });

            const gym = doorAt(p.tx, p.ty);
            if (gym) {
              onEnterGym?.(gym);
            }
          } else {
            p.px = lerp(p.fromX, p.toX, easeInOut(p.progress)) * TILE;
            p.py = lerp(p.fromY, p.toY, easeInOut(p.progress)) * TILE;
          }
        } else {
          const dir = pollDirection();
          let dx = 0;
          let dy = 0;
          if (dir === "up") {
            dy = -1;
            p.dir = 3;
          } else if (dir === "down") {
            dy = 1;
            p.dir = 0;
          } else if (dir === "left") {
            dx = -1;
            p.dir = 1;
          } else if (dir === "right") {
            dx = 1;
            p.dir = 2;
          }
          consumeAction(); // reserved for sign reading later

          if (dx !== 0 || dy !== 0) {
            const nx = p.tx + dx;
            const ny = p.ty + dy;
            if (!isSolid(nx, ny)) {
              p.moving = true;
              p.progress = 0;
              p.fromX = p.tx;
              p.fromY = p.ty;
              p.toX = nx;
              p.toY = ny;
            }
          }

          // proximity hint for the door in front of us
          const fx = p.tx + (p.dir === 1 ? -1 : p.dir === 2 ? 1 : 0);
          const fy = p.ty + (p.dir === 3 ? -1 : p.dir === 0 ? 1 : 0);
          onNearDoor?.(doorAt(fx, fy));
        }
      }
    };

    const render = () => {
      const g = gameRef.current;
      const cam = computeCamera(g.player.px, g.player.py, view.w, view.h);
      renderRegion(ctx, cam, view, g, { clearedGyms });
    };

    let lastTickAt = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(48, now - last);
      last = now;
      lastTickAt = now;
      update(dt);
      render();
    };

    // Primary loop: requestAnimationFrame (smooth; browser pauses it when the
    // tab is hidden — which is the behaviour we want during play).
    const raf = () => {
      tick();
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    // Safety net: if rAF stalls (hidden tab, throttled/embedded context) this
    // keeps the simulation responsive. It no-ops whenever rAF is healthy.
    const watchdog = setInterval(() => {
      if (performance.now() - lastTickAt > 200) tick();
    }, 100);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(watchdog);
      window.removeEventListener("resize", resize);
      detachInput();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-0 overflow-hidden bg-[#3f6b3a]"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
