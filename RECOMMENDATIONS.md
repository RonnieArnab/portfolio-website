# Recommendations — where to take this next

Ranked roughly by impact-per-effort. Nothing here is required; what's shipped
stands on its own.

## Do these first (they're blocking a great first impression)

1. **Add your photo.** The hero card is the single most important thing on the
   page and it's currently a placeholder. Drop a portrait (4:5 crop, ~1000px
   wide) in `public/assets/` and point `PROFILE.photo` at it in
   `src/data/socials.js`. A second and third photo would let the hero become a
   swipeable carousel — very on-theme.
2. **Set `ANTHROPIC_API_KEY` in Vercel.** Until then the "Ask about me" agent —
   the most impressive thing here for a GenAI role — shows a "not configured"
   message. Settings → Environment Variables.
3. **Real project links.** `src/data/journey.js` still has placeholder GitHub
   URLs for Travel Buddy and AI Resume Editor. Swap in the exact repos, and add
   screenshots to `public/assets/projects/` so the project cards can show them.
4. **Raster OG image.** `public/og-image.svg` is a placeholder and LinkedIn
   doesn't render SVG previews. Screenshot `public/og-template.html` at
   1200×630 → `public/og-image.png`, update `index.html`.

## High impact

5. **Photo carousel on the hero card.** Dating apps have multiple photos; a
   swipeable/tappable carousel with 3-4 images (you, your setup, a conference,
   the guitar) would make the metaphor land much harder.
6. **Persist likes + a "your matches" recap.** Store liked card IDs in
   `localStorage` and show a small summary ("You liked 4 things — here's how to
   reach him"). Cheap, and it makes the ❤️ feel consequential.
7. **Let the agent cite.** Have it return which résumé section an answer came
   from, and render that as a tappable chip that scrolls the deck to that card.
   This is a genuinely impressive RAG-lite touch for a GenAI portfolio.
8. **"Tailor to this JD" mode.** A second agent mode where a recruiter pastes a
   job description and gets an honest fit assessment plus gaps. It's a live demo
   of your AI Resume Editor project. (You picked chat-only for v1 — this is the
   natural v2.)
9. **Rate limiting that actually holds.** The current limiter is per serverless
   instance. Vercel KV or Upstash Redis gives you a real global limit before the
   site gets any traffic worth abusing.

## Nice polish

10. **Voice/typing polish on the agent** — stop button mid-stream, retry on
    error, and a "conversation starters" refresh.
11. **Analytics** — Vercel Web Analytics is one line; you'll learn which prompt
    cards people actually read.
12. **Custom domain** (e.g. `arnabghosh.dev`) and put it on your résumé.
13. **Dark mode** for the profile — the palette already has the tokens.
14. **A hobbies card**: guitar, music production (the sample-pack work),
    travel. Right now the profile is all engineering; dating profiles work
    because they show a person.
15. **Share card** — render current likes + your name to a PNG for sharing.

## The RPG (`/rpg`)

16. **Turn-based gym battles** instead of a plain content panel.
17. **Wild-encounter route for hobbies** — tall grass where random encounters
    are fun facts; a guitar "item" pickup that plays a riff.
18. **Link the two experiences** — after clearing all six gyms, show a
    "You've seen everything — go say hi" card that deep-links to the match screen.

## Content ideas

- Add a prompt card in your actual voice about *why* you moved into GenAI.
- A dated changelog of what you shipped, as a "recently active" feed.
- Link each RPG creature to the project where you used that skill.
