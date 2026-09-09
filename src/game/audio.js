// Lightweight audio: synthesized chiptune SFX via WebAudio (no asset files needed)
// plus an optional background loop if /public/assets/audio/bgm.mp3 exists.
// Everything is muted until the user opts in.

let ctx = null;
let enabled = false;
let bgm = null;
let bgmReady = false;

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function blip(freq, dur = 0.08, type = "square", vol = 0.12) {
  if (!enabled) return;
  const c = ac();
  if (!c) return;
  if (c.state === "suspended") c.resume();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = vol;
  gain.gain.setValueAtTime(vol, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  osc.connect(gain).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + dur);
}

export const sfx = {
  move: () => blip(180, 0.04, "square", 0.05),
  select: () => blip(660, 0.06),
  back: () => blip(300, 0.08, "triangle"),
  enter: () => {
    blip(520, 0.07);
    setTimeout(() => blip(780, 0.09), 70);
  },
  badge: () => {
    [523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => blip(f, 0.12, "square", 0.14), i * 90)
    );
  },
};

async function ensureBgm() {
  if (bgm || bgmReady) return;
  bgmReady = true;
  try {
    const { Howl } = await import("howler");
    bgm = new Howl({
      src: ["/assets/audio/bgm.mp3", "/assets/audio/bgm.ogg"],
      loop: true,
      volume: 0.35,
      html5: true,
      onloaderror: () => {
        bgm = null; // no track vendored yet — SFX still work
      },
    });
  } catch {
    bgm = null;
  }
}

export async function setAudioEnabled(on) {
  enabled = on;
  const c = ac();
  if (c && c.state === "suspended" && on) c.resume();
  await ensureBgm();
  if (!bgm) return;
  if (on) {
    try {
      bgm.play();
    } catch {
      /* ignore */
    }
  } else {
    bgm.pause();
  }
}

export function isAudioEnabled() {
  return enabled;
}
