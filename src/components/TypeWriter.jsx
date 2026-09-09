import { useEffect, useRef, useState } from "react";

// Types text out character-by-character. Click / press to skip to full text.
export default function TypeWriter({ text, speed = 18, onDone, instant = false }) {
  const [shown, setShown] = useState(instant ? text : "");
  const [done, setDone] = useState(instant);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (instant) {
      setShown(text);
      setDone(true);
      doneRef.current?.();
      return;
    }
    setShown("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
        doneRef.current?.();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, instant]);

  const skip = () => {
    if (!done) {
      setShown(text);
      setDone(true);
      doneRef.current?.();
    }
  };

  return (
    <span onClick={skip} className="cursor-pointer select-none">
      {shown}
      {!done && <span className="animate-flash">▍</span>}
    </span>
  );
}
