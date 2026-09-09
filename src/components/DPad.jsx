import { setDir } from "../game/engine/input.js";

// On-screen controls for touch devices. Hidden on md+ (keyboard assumed).
export default function DPad() {
  const hold = (dir) => ({
    onPointerDown: (e) => {
      e.preventDefault();
      setDir(dir, true);
    },
    onPointerUp: () => setDir(dir, false),
    onPointerLeave: () => setDir(dir, false),
    onPointerCancel: () => setDir(dir, false),
  });

  const Btn = ({ dir, label, cls }) => (
    <button
      {...hold(dir)}
      aria-label={`Move ${dir}`}
      className={`flex h-14 w-14 items-center justify-center bg-ink/85 text-parchment font-pixel text-lg border-2 border-parchment/40 active:bg-night ${cls}`}
    >
      {label}
    </button>
  );

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-between p-4 md:hidden">
      <div className="pointer-events-auto grid grid-cols-3 grid-rows-3 gap-1">
        <span />
        <Btn dir="up" label="▲" />
        <span />
        <Btn dir="left" label="◀" />
        <span className="h-14 w-14 bg-ink/40" />
        <Btn dir="right" label="▶" />
        <span />
        <Btn dir="down" label="▼" />
        <span />
      </div>
    </div>
  );
}
