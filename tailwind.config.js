/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'] },
      colors: { cream: "#faf8f5", card: "#ffffff", ink2: "#382b35", muted: "#6c6067", hush: "#eee7ec", blush: "#765c70", mint: "#548053" },
      boxShadow: { soft: "0 4px 18px -8px #382b3520", lift: "0 18px 45px -12px #382b3530" },
      keyframes: { blink: { "0%,100%": { opacity: "0.3" }, "50%": { opacity: "1" } } },
      animation: { blink: "blink 1.2s ease-in-out infinite" },
    },
  },
  plugins: [],
};
