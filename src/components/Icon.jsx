// Minimal inline icon set (no icon library dependency).
const PATHS = {
  gh: "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z",
  in: "M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3 8.5h3.87V21H3zM9.5 8.5h3.7v1.7h.05c.52-.98 1.8-2.02 3.7-2.02 3.95 0 4.68 2.6 4.68 5.98V21h-3.86v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9.5z",
  mail: "M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13A1.5 1.5 0 0 1 20.5 20h-17A1.5 1.5 0 0 1 2 18.5zM4 7v.4l8 5 8-5V7l-8 5z",
  map: "M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2zm0 2.2 6 2v11.6l-6-2z",
  book: "M4 4h9a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4zM20 4h-1a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h1z",
  doc: "M6 2h8l4 4v16H6zM14 3v4h4",
  soundOn: "M4 9v6h4l5 5V4L8 9zM16 8a5 5 0 0 1 0 8M18.5 5.5a9 9 0 0 1 0 13",
  soundOff: "M4 9v6h4l5 5V4L8 9zM16 9l6 6M22 9l-6 6",
  star: "M12 2l2.9 6.3L22 9.3l-5 4.7 1.2 6.9L12 17.7 5.8 20.9 7 14 2 9.3l7.1-1z",
  arrow: "M5 12h14M13 5l7 7-7 7",
};

export default function Icon({ name, size = 20, className = "" }) {
  const d = PATHS[name];
  if (!d) return null;
  const stroke = ["soundOn", "soundOff", "arrow"].includes(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill={stroke ? "none" : "currentColor"}
      stroke={stroke ? "currentColor" : "none"}
      strokeWidth={stroke ? 2 : 0}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
