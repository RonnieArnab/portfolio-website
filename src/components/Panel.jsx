import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Accessible modal shell: focus trap, Esc to close, scroll-locked backdrop.
export default function Panel({
  title,
  onClose,
  children,
  footer,
  maxWidth = "max-w-2xl",
  labelledBy = "panel-title",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    const focusable = () =>
      node.querySelectorAll(
        'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
      );
    const first = focusable()[0];
    (first || node).focus();

    const onKey = (e) => {
      if (e.key === "Escape" && onClose) {
        e.stopPropagation();
        onClose();
      }
      if (e.key === "Tab") {
        const items = Array.from(focusable());
        if (items.length === 0) return;
        const idx = items.indexOf(document.activeElement);
        if (e.shiftKey && (idx <= 0)) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && idx === items.length - 1) {
          e.preventDefault();
          items[0].focus();
        }
      }
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6">
      <motion.div
        className="absolute inset-0 bg-ink/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`pixel-panel relative w-full ${maxWidth} max-h-[88vh] flex flex-col outline-none`}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <header className="flex items-center justify-between gap-3 border-b-4 border-ink bg-ink px-4 py-3">
          <h2
            id={labelledBy}
            className="font-pixel text-[11px] uppercase text-parchment sm:text-sm"
          >
            {title}
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close"
              className="font-pixel text-parchment text-sm px-2 hover:text-badge"
            >
              ✕
            </button>
          )}
        </header>

        <div className="scroll-ok overflow-y-auto px-5 py-5 text-lg leading-snug">
          {children}
        </div>

        {footer && (
          <footer className="border-t-4 border-ink bg-wall px-4 py-3">
            {footer}
          </footer>
        )}
      </motion.div>
    </div>
  );
}
