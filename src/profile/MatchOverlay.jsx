import { useRef } from "react";
import { motion } from "framer-motion";
import Ico from "./Ico.jsx";
import { CONTACT } from "../data/profile.js";
import useDialogFocus from "./useDialogFocus.js";

export default function MatchOverlay({ likedLabel, onClose, reduced }) {
  const dialog = useRef(null);
  useDialogFocus(dialog, onClose);
  return <div className="contact-overlay">
    <motion.div className="contact-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
    <motion.div ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="contact-heading" className="contact-dialog" initial={{ opacity: 0, y: reduced ? 0 : 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <button className="contact-close" aria-label="Close contact details" onClick={onClose}><Ico name="x" /></button>
      <p className="match-eyebrow">A GOOD CONVERSATION STARTS HERE</p>
      <h2 id="contact-heading">Let’s build something useful.</h2>
      <p>{likedLabel ? <>Glad “{likedLabel}” caught your eye. </> : null}Have a role, project, or idea in mind? Here’s how to reach me.</p>
      <div className="contact-links">{CONTACT.socials.map(s => <a key={s.id} href={s.url} target={s.id === "email" ? undefined : "_blank"} rel="noreferrer"><Ico name={s.icon} /><span>{s.label}<small>{s.handle}</small></span><span aria-hidden="true" style={{ flex: "none" }}>↗</span></a>)}
        <a href={CONTACT.resume} target="_blank" rel="noreferrer"><Ico name="doc" /><span>Read my résumé<small>PDF · Opens in a new tab</small></span><Ico name="external" size={18} /></a>
      </div>
      <button className="contact-dismiss" onClick={onClose}>Back to the profile</button>
    </motion.div>
  </div>;
}
