# Arnab Ghosh — portfolio

Two portfolios in one repo.

**`/` — the profile.** Arnab's résumé laid out like a dating-app profile: photos,
Hinge-style prompt cards, likeable sections, and an **"It's a Match!"** contact
screen. Behind it, an AI **wingman** you can chat with — it answers questions
about his work, grounded strictly in the résumé.

**`/rpg` — the easter egg.** The same career history, playable as an original
top-down RPG. Six "gyms", one per milestone; skills are collectible creatures.

> No Nintendo / Pokémon assets, names or models are used anywhere. Every
> creature, gym, badge and place name is original — see [`CREDITS.md`](./CREDITS.md).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173 — everything except the AI agent
```

The chat agent is a Vercel serverless function, so plain `vite` can't serve it.
For the full experience:

```bash
npm i -g vercel && vercel dev
```

…with `ANTHROPIC_API_KEY` in `.env.local` (see [`.env.example`](./.env.example)).
Without a key the chat shows a friendly "not configured" message and everything
else works normally.

```bash
npm run build    # production build to /dist
npm run lint
```

Node 18+ recommended.

## How it's built

| Layer | Tech |
| --- | --- |
| App | Vite + React 18 (JSX) + Tailwind CSS + React Router |
| Profile UI | Card deck with CSS scroll-reveal, Framer Motion for overlays |
| 3D | `@react-three/fiber` + `drei`, primitives only, lazy-loaded |
| AI wingman | `api/chat.js` → Anthropic Messages API (`claude-opus-5`), SSE streaming |
| RPG | Custom canvas engine — fixed-step loop, tile movement, grid collision |
| State | React context + reducer, `localStorage` for RPG progress |

### The agent

`api/chat.js` is a Vercel Node function. It:

- keeps the API key **server-side** — it never reaches the browser;
- builds its system prompt from the résumé data at
  [`api/_context.js`](./api/_context.js), so the agent can't drift from what's
  actually on the site;
- refuses anything off-topic, and says "that's not on his résumé" rather than
  inventing facts;
- caches the ~1.8k-token résumé prefix (`cache_control: ephemeral`) and runs at
  `effort: "low"`, so a conversation costs a fraction of a cent;
- rate-limits to 12 requests/minute per IP, caps history at 20 messages and 800
  chars each. The limiter is per serverless instance — swap in Vercel KV if you
  need a hard guarantee.

### One source of truth

[`src/data/journey.js`](./src/data/journey.js) holds every résumé fact. Everything
else is derived from it:

- [`src/data/profile.js`](./src/data/profile.js) — the dating-profile card deck
- [`src/data/creatures.js`](./src/data/creatures.js) — skills as RPG creatures
- [`src/game/world/region.js`](./src/game/world/region.js) — generates the RPG map
- [`api/_context.js`](./api/_context.js) — the agent's grounding context

## Make it yours

1. **Photo** → drop a square/portrait image in `public/assets/`, point
   `PROFILE.photo` in [`src/data/socials.js`](./src/data/socials.js) at it.
2. **Résumé** → replace `public/resume.pdf`.
3. **Content** → edit `src/data/journey.js`, then the prompt answers in
   `src/data/profile.js`.
4. **OG image** → open `public/og-template.html` at 1200×630, screenshot to
   `public/og-image.png`, update the tags in `index.html`.

Want this concept for your own portfolio?
[`REPLICATE_PROMPT.md`](./REPLICATE_PROMPT.md) is a copy-paste prompt for a coding
agent. Ideas for extending it: [`RECOMMENDATIONS.md`](./RECOMMENDATIONS.md).

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — Vite is
   auto-detected; `vercel.json` handles the SPA rewrite (with `/api` excluded)
   and asset caching.
3. Add `ANTHROPIC_API_KEY` under **Settings → Environment Variables**.
4. Every push to `main` redeploys.

## License

MIT for the code and the original art. Fonts are OFL (Google Fonts).
