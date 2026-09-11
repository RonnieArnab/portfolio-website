import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GALLERY } from "../data/gallery.js";
import Ico from "./Ico.jsx";

export default function PhotoGallery({ onLike }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();
  const down = useRef(null);
  const dialog = useRef(null);
  const photo = GALLERY[index];
  const move = delta => setIndex(i => (i + delta + GALLERY.length) % GALLERY.length);
  useEffect(() => {
    if (expanded) dialog.current?.showModal();
    else dialog.current?.close();
  }, [expanded]);
  return <div className="photo-gallery">
    <div className="photo-main" role="region" aria-roledescription="carousel" aria-label="Arnab's photo gallery" tabIndex={0}
      onKeyDown={e => { if (e.key === "ArrowRight") { e.preventDefault(); move(1); } if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); } }}
      onPointerDown={e => { down.current = e.clientX; }}
      onPointerUp={e => { if (down.current !== null && Math.abs(e.clientX - down.current) > 45) move(e.clientX < down.current ? 1 : -1); down.current = null; }}
      onPointerCancel={() => { down.current = null; }}>
      <AnimatePresence initial={false} mode="wait"><motion.img key={photo.src} src={photo.src} alt={photo.alt} draggable={false} fetchPriority="high" style={{ objectPosition: photo.position }} initial={{ opacity: reduced ? 1 : 0.3 }} animate={{ opacity: 1 }} exit={{ opacity: reduced ? 1 : 0.3 }} transition={{ duration: 0.18 }} /></AnimatePresence>
      <div className="photo-shade" />
      <div className="photo-progress" aria-hidden="true">{GALLERY.map((p, i) => <span key={p.src} className={i === index ? "current" : ""} />)}</div>
      <span className="photo-availability"><i /> Open to the right opportunity</span>
      <button className="photo-expand" aria-label="Expand photo" onClick={() => setExpanded(true)}>⤢</button>
      <button className="photo-arrow previous" aria-label="Previous photo" onClick={() => move(-1)}>‹</button>
      <button className="photo-arrow next" aria-label="Next photo" onClick={() => move(1)}>›</button>
      <div className="photo-caption"><span>SOFTWARE ENGINEER. ACTUAL HUMAN.</span><h2>Arnab <span>✓</span></h2><p>India · GenAI · Probably planning a trip</p></div>
      <button className="photo-heart" aria-label="Like this photo" onClick={() => onLike(photo.title)}><Ico name="heart" size={24} /></button>
    </div>
    <div className="photo-meta" aria-live="polite"><div><strong>{photo.title}</strong><p>{photo.caption}</p></div><span>{String(index + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}</span></div>
    <div className="photo-thumbnails">{GALLERY.map((p, i) => <button key={p.src} aria-label={`Select photo ${i + 1}`} aria-pressed={i === index} onClick={() => setIndex(i)}><img src={p.src} alt="" loading="lazy" style={{ objectPosition: p.position }} /></button>)}</div>
    <dialog ref={dialog} className="photo-dialog" aria-label="Full screen photo gallery" onCancel={() => setExpanded(false)} onClick={e => { if (e.target === e.currentTarget) setExpanded(false); }} onKeyDown={e => { if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); }}>
      <button className="photo-dialog-close" aria-label="Close full photo" onClick={() => setExpanded(false)}>✕</button><img src={photo.src} alt={photo.alt} /><div><button onClick={() => move(-1)} aria-label="Previous full photo">←</button><span>{photo.title}</span><button onClick={() => move(1)} aria-label="Next full photo">→</button></div>
    </dialog>
  </div>;
}
