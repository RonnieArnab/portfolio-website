# Build-it-yourself prompt

Copy everything in the box below into your coding agent (Claude Code, Cursor,
etc.), fill in the four `<<REPLACE>>` blocks with your own details, and let it
build. It reproduces the UI of this project — a portfolio you play like a
top-down monster-collecting RPG — with **your** content.

> This prompt describes a *genre* (top-down RPG, "gyms" as milestones, "creatures"
> as skills). Do not use Nintendo / Pokémon names, sprites, music or models.
> Keep every creature, gym, badge and place name original.

---

````text
Build a personal portfolio website that works as a small top-down, GBA-era
monster-collecting RPG. The visitor controls a character who walks a pixel
overworld; each building is a career milestone ("gym"); beating a gym awards a
badge; skills are shown as original collectible "creatures". There is also a
plain, accessible résumé view with identical content.

## Stack (keep it minimal, no game framework)
- Vite + React 18 + JavaScript (JSX), Tailwind CSS
- framer-motion for panel/dialogue transitions
- @react-three/fiber + @react-three/drei for small 3D showcases (lazy-loaded)
- Howler.js optional; synthesize SFX with the Web Audio API so no audio files are needed
- Deploy target: Vercel (SPA rewrite to index.html)

## Architecture
- A custom canvas engine owns the overworld. React owns menus, panels and state.
- Fixed-ish timestep loop on requestAnimationFrame, PLUS a setInterval watchdog
  that pumps the sim if rAF stalls (hidden tab / embedded contexts).
- Tile-based movement: the character steps one tile at a time with eased
  interpolation (~150ms/tile). Collision is a boolean grid. Holding a direction
  walks continuously; a single tap steps one tile (keep each direction "active"
  for ~140ms after keydown so fast taps register).
- Input: Arrow keys + WASD; on-screen D-pad shown only at mobile widths.
- Camera follows the player, clamped to the world bounds.
- The overworld map is GENERATED from the milestone data (below), not hand-painted:
  scatter grass/trees, draw a tree border, carve an L-shaped path connecting the
  milestones in order, then stamp each building so its door sits on the path.
- State: React context + useReducer. Scenes: title | overworld | gym | badges |
  roster | resume. Persist { started, badges, visited, playerTile, audioOn } to
  localStorage (wrap every access in try/catch; the game must work with storage
  disabled).

## File layout
src/
  game/engine/    loop, input, camera, renderer(canvas 2D, integer-scaled, pixelated), collision
  game/world/     region (generates tilemap + collision + door triggers), tileset (procedural draw)
  game/GameCanvas.jsx   mounts <canvas>, runs the loop, calls onEnterGym(id)
  state/          GameContext, gameReducer, persistence
  scenes/         TitleScreen, Overworld, GymScene (intro dialogue -> content panel -> "badge get"),
                  BadgeCase (mini-map + badges + fast-travel), RosterScreen (creatures),
                  ResumeMode (semantic HTML résumé from the same data)
  three/          Showcase.jsx  (crystal | trophy | scroll | creature, all from primitives)
  components/     Panel (focus-trapped modal, Esc to close), DialogueBox (typewriter,
                  press once to finish line, again to advance), TypeWriter, PixelButton,
                  DPad, TopBar (badge count + Map/Roster/Résumé/audio), Icon (inline SVG)
  data/           journey.js (all résumé content + each gym's door tile),
                  creatures.js (skills as creatures), socials.js
  styles/index.css  retro theme: "Press Start 2P" for headings, "VT323" for body,
                    parchment panels with a chunky double border, optional CRT scanline toggle

## Mechanics per gym
Walk into the door -> DialogueBox with the "gym leader" intro -> content Panel
showing the real milestone (with a rotating 3D showcase) -> "Take the <Badge>"
-> "Badge get!" screen -> return to overworld at the door. Badges persist. The
BadgeCase has a fast-travel button per gym. Everything reachable by keyboard;
respect prefers-reduced-motion (MotionConfig reducedMotion="user", no 3D spin).

## Accessibility / SEO
- ResumeMode renders every piece of content as semantic HTML, toggled from the
  top bar and offered automatically on small touch screens / reduced motion.
- <title>, meta description, Open Graph + Twitter tags, an OG image, favicon.
- Canvas is aria-hidden; all real content lives in the DOM panels too.

## Art direction
- Original pixel style. Draw tiles and sprites procedurally in code (flat GBA
  palette: grass greens, sand path, parchment walls, coloured roofs) OR drop in
  CC0 packs (Kenney, OpenGameArt) under public/assets/ and list them in CREDITS.md.
- Creatures: simple original blobs with ears + eyes, tinted per "type".
- 3D: low-poly, assembled from boxes/spheres/cones — never download model files.

## Content — REPLACE THESE

<<REPLACE: IDENTITY>>
Name, role/title, one-line tagline, location, email, links (GitHub, LinkedIn, …),
path to résumé PDF, path to a square photo.

<<REPLACE: MILESTONES / GYMS>>
For each milestone: id, display name, "gym leader" name + title + colour, the
door tile [col,row] on the map, building size, a badge { name, colour, shape },
2–3 lines of in-character intro, and the real content (headline, subhead, date
range, bullet points or sub-sections, tech tags, links). Typical set: Education,
Experience (one section per achievement), 2–4 Projects, a Skills "lab", a Contact
"centre".

<<REPLACE: SKILL-CREATURES>>
~12–18 entries: original creature name, "type" (e.g. Script / Cloud / Aegis),
the real skill it represents, a power rating 1–5 (how central it is to you — not
a benchmark), a colour, and one sentence of flavour lore.

<<REPLACE: DEPLOY>>
Your repo URL and Vercel project.

## Acceptance criteria
- `npm run dev`: walk with arrows/WASD; collision holds; camera follows; mobile
  D-pad works at narrow widths.
- Every gym: intro -> content with correct text -> badge awarded -> persists on reload.
- BadgeCase mini-map shows player + gyms; fast-travel works; roster lists all creatures.
- Résumé toggle shows all content as semantic HTML; Esc closes panels; tab order sane.
- Audio muted on load, toggle works, no console errors.
- `npm run build` and `npm run lint` are clean; Lighthouse performance ≥ 90 desktop.
````
