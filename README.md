# Arnab Ghosh — portfolio

A personal engineering portfolio with a warm cream, plum, and yellow palette.

- Six travel photos with swipe, keyboard navigation, and fullscreen viewing.
- Conversational prompts, clearly labeled controls, and direct contact links.
- Project stories with expandable implementation notes.
- An experience timeline covering Firstsource and VIT Vellore.
- Skills organized around practical applications, with supporting work and a full toolkit.
- A résumé-grounded AI assistant, served by a Vercel function.

The interface uses system fonts, readable body text, keyboard focus indicators,
and touch controls at least 44 pixels tall. It respects reduced motion and allows
browser zoom. Unknown routes return visitors to the main profile.

## Run locally

```bash
npm install
npm run dev
npm run build
npm run lint
npm test
```

Vite serves the portfolio at `http://localhost:5173`. The AI assistant requires
Vercel's serverless runtime and `ANTHROPIC_API_KEY` in `.env.local`; see
`.env.example`. Use `vercel dev` to run the API locally. Without the API, the chat
shows an unavailable message and visitors can still browse the portfolio and
contact links.

## Content and code

- `src/data/experience.js`: professional facts shared with the assistant.
- `src/data/gallery.js`: photo captions and order.
- `src/data/socials.js`: name, role, contact links, and résumé location.
- `src/profile/CareerStory.jsx`: project narratives and experience timeline.
- `src/profile/SkillsOverview.jsx`: skills linked to demonstrated work.
- `src/styles/profile-v3.css`: profile layout and responsive typography.
- `api/_context.js`: the assistant's grounding context.

React 18, Vite, React Router, Framer Motion, and Tailwind CSS. No graphics engine,
external model loading, remote font requests, or local progress system is needed.

## Deployment

The existing `vercel.json` provides SPA routing and the `/api` endpoint. Connect
this repository to Vercel and configure `ANTHROPIC_API_KEY` for the assistant.
Local edits do not publish automatically unless pushed to a connected branch.

## Further ideas

See `RECOMMENDATIONS.md` for small additions connecting travel and engineering.
Asset credits are in `CREDITS.md`. Code and original vector art are MIT;
user-supplied photos and résumé are excluded.
