// Central place for every outward link. Edit here, it updates the whole site.
export const PROFILE = {
  name: "Arnab Ghosh",
  title: "Software Engineer — GenAI",
  tagline: "Builds production LLM systems: guardrails, RAG, agents, batch inference.",
  location: "India — Remote",
  email: "as920037.arnabghosh@gmail.com",
  // Replace the placeholder: drop a square photo in public/assets/ and point
  // this at it, e.g. "/assets/trainer-photo.jpg".
  photo: "/assets/trainer-photo.svg",
  resume: "/resume.pdf",
};

export const SOCIALS = [
  {
    id: "github",
    label: "GitHub",
    handle: "RonnieArnab",
    url: "https://github.com/RonnieArnab",
    icon: "gh",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "arnab-ghosh",
    url: "https://www.linkedin.com/in/arnab-ghosh-828210283/",
    icon: "in",
  },
  {
    id: "email",
    label: "Email",
    handle: PROFILE.email,
    url: `mailto:${PROFILE.email}`,
    icon: "mail",
  },
  // Add more here, e.g. { id: "x", label: "X", handle: "...", url: "...", icon: "x" }
];
