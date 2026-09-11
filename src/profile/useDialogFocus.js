import { useEffect } from "react";

export default function useDialogFocus(ref, onClose) {
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const element = ref.current;
    const selector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]';
    (element?.querySelector('[data-autofocus]') || element)?.focus();
    const handleKey = event => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      if (event.key !== "Tab") return;
      const controls = [...element.querySelectorAll(selector)].filter(control => control.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === element)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    element?.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = overflow;
      element?.removeEventListener('keydown', handleKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [ref, onClose]);
}
