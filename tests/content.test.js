import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { CHAPTERS } from '../src/data/experience.js';
import { RESUME_CONTEXT } from '../api/_context.js';
import { GALLERY } from '../src/data/gallery.js';

test('the assistant retains the professional facts shown in the portfolio', () => {
  for (const chapter of CHAPTERS) {
    if (chapter.id === 'skills') {
      for (const group of chapter.content.groups) for (const skill of group.items) assert.ok(RESUME_CONTEXT.includes(skill));
    } else assert.ok(RESUME_CONTEXT.includes(chapter.content.headline));
  }
  const experience = CHAPTERS.find(chapter => chapter.id === 'experience');
  assert.equal(experience.content.floors.length, 8);
  for (const system of experience.content.floors) assert.ok(RESUME_CONTEXT.includes(system.body));
  assert.doesNotMatch(RESUME_CONTEXT, /pok[eé]mon|\/rpg|career gyms/i);
});

test('every supplied gallery photo resolves to a local JPEG asset', () => {
  assert.equal(GALLERY.length, 6);
  assert.equal(new Set(GALLERY.map(photo => photo.src)).size, 6);
  for (const photo of GALLERY) {
    const file = new URL(`../public${photo.src}`, import.meta.url);
    assert.ok(existsSync(file), photo.src);
    assert.equal(readFileSync(file).subarray(0, 3).toString('hex'), 'ffd8ff');
    assert.ok(photo.alt.length > 20);
  }
});
