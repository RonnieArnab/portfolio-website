# Recommendations — where to take this next

Ranked roughly by impact-per-effort. Nothing here is required; v1 stands on its own.

## High impact, low effort

1. **Add your photo & real project links.**
   - Square photo → `public/assets/`, then set `PROFILE.photo` in `src/data/socials.js`.
   - For each project in `src/data/journey.js`, replace the placeholder GitHub URL
     with the exact repo, and drop 1–2 screenshots in `public/assets/projects/`.
2. **Real OG image.** `public/og-image.svg` is a placeholder. Open
   `public/og-template.html` in a browser at 1200×630 and screenshot it to
   `public/og-image.png`, then point the tags in `index.html` at the PNG —
   LinkedIn/Twitter previews look much better with a raster image.
3. **Analytics.** Add Vercel Web Analytics (one line) or Plausible to see which
   gyms visitors actually open.
4. **A "Trainer Card" share image.** A button on the starter card that renders
   the current badge progress to a PNG (html-to-image) so people can share it.
5. **Custom domain** on Vercel (e.g. `arnabghosh.dev`) and put it in your résumé.

## High impact, medium effort

6. **Turn-based gym "battles."** Instead of a plain content panel, a short
   turn-based encounter where picking the right answer about your work "defeats"
   the leader. This was the biggest cut from v1.
7. **Wild-encounter route for hobbies.** A patch of tall grass where random
   encounters are fun facts — your guitar playing, music production
   (`ASTRONAUT IN THE OCEAN` / `Mi Gente` sample-pack work), travel. Give the
   guitar an "item" pickup that plays a short riff.
8. **Guestbook.** A "Comm Center" terminal that writes to a serverless function
   (Vercel + a KV store) or Formspree, so visitors can leave a note.
9. **Sound.** Vendor a CC0 chiptune loop to `public/assets/audio/bgm.mp3`
   (the toggle + loader are already wired).

## Nice polish

10. **Day/night tint** based on the visitor's local clock.
11. **Konami code** easter egg (unlocks a secret creature / dev-commentary).
12. **Footprints / step dust** and a subtle idle animation on the trainer.
13. **Deep links.** `/#/gym/experience` opens that gym directly for sharing.
14. **More creatures & evolutions** as you learn new tools — the data model
    already supports it.
15. **i18n** — all copy is in `src/data`, so a second language is mostly translation.

## Content ideas

- An **"Experience" second floor** for your current role as it grows.
- A **"Region newspaper"** changelog: dated notes on what you shipped.
- Link each creature to the project(s) where you used that skill.
