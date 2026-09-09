/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        term: ['"VT323"', "monospace"],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      colors: {
        // ── Dating-app profile palette ──
        cream: "#F7F2EC",
        card: "#FFFFFF",
        ink2: "#17140F",
        muted: "#6E665C",
        hush: "#EDE5DA",
        blush: "#FF5A5F",
        honey: "#FFB33E",
        mint: "#2FB574",

        // "Devroot Region" palette
        ink: "#0e1a2b",
        night: "#132741",
        grass: "#4a7a3a",
        grassDark: "#3a6330",
        path: "#d8c9a3",
        water: "#3b6ea5",
        roof: "#c2452d",
        wall: "#e9e2cf",
        badge: "#f5c542",
        parchment: "#f4ecd8",
      },
      boxShadow: {
        panel: "0 0 0 4px #0e1a2b, 0 0 0 8px #e9e2cf, 8px 8px 0 8px rgba(0,0,0,0.35)",
        pixel: "4px 4px 0 0 #0e1a2b",
        soft: "0 1px 2px rgba(23,20,15,.04), 0 8px 24px -8px rgba(23,20,15,.14)",
        lift: "0 2px 4px rgba(23,20,15,.05), 0 18px 40px -12px rgba(23,20,15,.24)",
        heart: "0 6px 18px -4px rgba(255,90,95,.55)",
      },
      keyframes: {
        bob: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        flash: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        pop: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "60%": { transform: "scale(1.12)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        blink: {
          "0%,100%": { opacity: "0.25" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        bob: "bob 1.6s ease-in-out infinite",
        flash: "flash 1s steps(2) infinite",
        pop: "pop .45s cubic-bezier(.2,1.3,.4,1) both",
        blink: "blink 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
