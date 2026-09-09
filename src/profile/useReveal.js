import { useEffect, useRef, useState } from "react";

// Scroll-reveal via IntersectionObserver + a CSS class.
//
// Deliberately NOT a JS animation: CSS transitions still complete when the tab
// is backgrounded or rAF is throttled, so a card can never get stuck invisible
// half-way through a fade. If IntersectionObserver is missing, we show
// everything immediately rather than hiding content.
export default function useReveal({ margin = "-60px", once = true } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    if (shown) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { rootMargin: margin }
    );
    io.observe(node);

    // Safety net: never leave content hidden if the observer never fires.
    const t = setTimeout(() => setShown(true), 2500);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [margin, once, shown]);

  return [ref, shown];
}
