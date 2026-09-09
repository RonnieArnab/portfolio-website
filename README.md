# Arnab's Journey

The portfolio of **Arnab Ghosh** — Software Engineer (GenAI) — built as a small
top-down, GBA-era monster-collecting RPG. Walk the Devroot Region, challenge six
career-milestone "gyms", and collect a badge for each. There's also a plain
résumé view with the same content for anyone who'd rather just read.

> No Nintendo / Pokémon assets, names or models are used. Every creature, gym,
> badge and place name is original. See [`CREDITS.md`](./CREDITS.md).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run preview  # serve the build
npm run lint
```

Node 18+ recommended.

## How it's built

| Layer | Tech |
| --- | --- |
| App | Vite + React 18 (JSX) + Tailwind CSS |
| Overworld | Custom canvas engine — fixed-step loop, tile movement, grid collision, following camera. No game framework. |
| Transitions | Framer Motion (`reducedMotion="user"`) |
| 3D showcases | @react-three/fiber + drei, models built from primitives, lazy-loaded |
| Audio | Web Audio API SFX, muted by default; optional `bgm.mp3` |
| State | React context + reducer, persisted to `localStorage` |

The map is **generated from data**: [`src/data/journey.js`](./src/data/journey.js)
holds every résumé fact plus each gym's door tile, and
[`src/game/world/region.js`](./src/game/world/region.js) scatters terrain, carves
the path between gyms and stamps the buildings. Edit `journey.js`,
[`creatures.js`](./src/data/creatures.js) and [`socials.js`](./src/data/socials.js)
and the whole site updates.

## Make it yours

1. **Photo** → drop a square image in `public/assets/` and set `PROFILE.photo` in `src/data/socials.js`.
2. **Résumé** → replace `public/resume.pdf`.
3. **Content** → edit `src/data/journey.js` (milestones), `creatures.js` (skills), `socials.js` (links).
4. **OG image** → open `public/og-template.html` at 1200×630, screenshot to `public/og-image.png`, update the tags in `index.html`.
5. **Art** (optional) → see `CREDITS.md` for how to swap the procedural sprites for CC0 packs.

Want the concept for a different portfolio? [`REPLICATE_PROMPT.md`](./REPLICATE_PROMPT.md)
is a copy-paste prompt for a coding agent. Ideas for extending it are in
[`RECOMMENDATIONS.md`](./RECOMMENDATIONS.md).

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — it auto-detects
   Vite; `vercel.json` handles the SPA rewrite and asset caching.
3. Every push to `main` redeploys.

## Controls

- **Move** — Arrow keys / WASD (or the on-screen D-pad on mobile)
- **Advance dialogue** — Enter / Space / click
- **Map & badges** — `M` or the Map button
- **Just read it** — the Résumé button

## License

MIT for the code and the original art. Fonts are OFL (Google Fonts).
