import { PROFILE, SOCIALS } from "./socials.js";

export const HEADER = {
  name: PROFILE.name.split(" ")[0],
  fullName: PROFILE.name,
  role: PROFILE.title,
  photo: PROFILE.photo,
};
export const CONTACT = { ...PROFILE, socials: SOCIALS };
export const SUGGESTED_QUESTIONS = [
  "What's the hardest thing he's shipped?",
  "Is he a fit for a backend role?",
  "Has he done RAG at real scale?",
  "What's his experience with Azure?",
];
