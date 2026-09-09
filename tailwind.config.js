/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        term: ['"VT323"', "monospace"],
      },
      colors: {
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
      },
      animation: {
        bob: "bob 1.6s ease-in-out infinite",
        flash: "flash 1s steps(2) infinite",
      },
    },
  },
  plugins: [],
};
