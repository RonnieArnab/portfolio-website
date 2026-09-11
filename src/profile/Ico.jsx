// Icon set for the profile UI. Stroke-based, 24-grid, inherits currentColor.
const STROKE = {
  work: "M3 8.5A2.5 2.5 0 0 1 5.5 6h13A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5zM9 6V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V6M3 12h18",
  pin: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z M12 10.5v.01",
  school: "M12 4 2.5 9 12 14l9.5-5zM6 11.5V17c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-5.5",
  code: "M9 8l-4 4 4 4M15 8l4 4-4 4",
  sparkle: "M12 3.5l1.7 4.5 4.5 1.7-4.5 1.7L12 16l-1.7-4.6L5.8 9.7l4.5-1.7zM18.5 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z",
  clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  x: "M6 6l12 12M18 6L6 18",
  chat: "M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.5-5A8 8 0 1 1 21 12z",
  send: "M4.5 12 20 4.5l-4 15.5-4.2-6z M11.8 14 20 4.5",
  arrow: "M5 12h14M13 5l7 7-7 7",
  down: "M12 4v13M6 12l6 6 6-6",
  external: "M14 4h6v6M20 4l-9 9M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10",
  undo: "M4 9h9a5 5 0 0 1 0 10h-3M4 9l4-4M4 9l4 4",
  gh: "M9 19c-4 1.2-4-2.2-5.5-2.8M15 21v-3.3c0-.9.2-1.6-.4-2.2 2.5-.3 5-1.3 5-5.5a4.2 4.2 0 0 0-1.2-3 3.9 3.9 0 0 0-.1-3s-1-.3-3.3 1.2a11.3 11.3 0 0 0-6 0C6.7 3.7 5.7 4 5.7 4a3.9 3.9 0 0 0-.1 3 4.2 4.2 0 0 0-1.2 3c0 4.2 2.5 5.2 5 5.5-.4.4-.5.9-.5 1.6V21",
  in: "M6.9 5a1.9 1.9 0 1 1-3.8 0 1.9 1.9 0 0 1 3.8 0zM3.4 8.9h3.2V21H3.4zM10 8.9h3.1v1.7c.5-.9 1.7-2 3.5-2 3.5 0 4.3 2.2 4.3 5.3V21h-3.2v-6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H10z",
  mail: "M3 7.5A1.5 1.5 0 0 1 4.5 6h15A1.5 1.5 0 0 1 21 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5zM3.6 7l8.4 5.6L20.4 7",
  doc: "M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5zM14 3v4.5h4.5",
};

const FILLED = {
  heart:
    "M12 20.7 4.3 13a4.9 4.9 0 0 1 0-7 4.9 4.9 0 0 1 7 0l.7.7.7-.7a4.9 4.9 0 0 1 7 0 4.9 4.9 0 0 1 0 7z",
  verified:
    "M12 1.6l2.4 1.8 3-.2.9 2.9 2.5 1.7-1.1 2.8 1.1 2.8-2.5 1.7-.9 2.9-3-.2L12 22.4 9.6 20.6l-3 .2-.9-2.9-2.5-1.7L4.3 13 3.2 10.2l2.5-1.7.9-2.9 3 .2z",
  star: "M12 2.5l2.9 6.2 6.6.8-4.9 4.5 1.3 6.6L12 17.4l-5.9 3.2 1.3-6.6-4.9-4.5 6.6-.8z",
};

export default function Ico({ name, size = 20, className = "", strokeWidth = 1.7 }) {
  const filled = FILLED[name];
  const d = filled || STROKE[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? 0 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

// The verified tick needs a check on top of the badge shape.
export function VerifiedBadge({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d={FILLED.verified} fill="currentColor" />
      <path
        d="M8.4 12.2l2.5 2.5 4.7-4.9"
        fill="none"
        stroke="#fff"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
