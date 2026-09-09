# Credits & Licenses

## Original work

Every **creature, gym leader, badge, place name and piece of lore** in this project
is original and was written for this portfolio. Nothing here uses Nintendo / Game
Freak / The Pokémon Company intellectual property — no Pokémon names, sprites,
music, or 3D models. The "monster-collecting RPG" is a *genre*, and that's all
that's borrowed.

## Art

| Asset | Source | License |
| --- | --- | --- |
| Overworld tiles, buildings, trainer & NPC sprites | Drawn procedurally in code (`src/game/world/tileset.js`) | Original — MIT (this repo) |
| Skill-creature sprites | Inline SVG (`src/scenes/RosterScreen.jsx`) | Original — MIT |
| Badge medals | Inline SVG (`src/scenes/GymScene.jsx`) | Original — MIT |
| 3D showcase models (crystal, trophy, scroll, creature) | Built from Three.js primitives (`src/three/Showcase.jsx`) | Original — MIT |
| Favicon, OG image | Inline SVG (`public/`) | Original — MIT |

> **If you swap in external art** (e.g. CC0 packs from [Kenney](https://kenney.nl),
> [OpenGameArt](https://opengameart.org), or itch.io), add a row here for each
> pack with its author, URL and license, and keep the files under
> `public/assets/`. Only use assets whose license permits commercial use and
> redistribution (CC0 / CC-BY / OGA-BY are safe; CC-BY needs attribution here).

## Fonts

| Font | Source | License |
| --- | --- | --- |
| Press Start 2P | Google Fonts | SIL Open Font License 1.1 |
| VT323 | Google Fonts | SIL Open Font License 1.1 |

## Audio

Sound effects are synthesized at runtime with the Web Audio API
(`src/game/audio.js`) — no audio files, no licenses. If you add a background
music track, put it at `public/assets/audio/bgm.mp3` and credit it here (a good
CC0 source is [Kenney's music packs](https://kenney.nl/assets?q=audio) or
OpenGameArt).

## Libraries

React, Vite, Tailwind CSS, Framer Motion, three.js, @react-three/fiber,
@react-three/drei, Howler.js — see `package.json`; all MIT / permissive.
