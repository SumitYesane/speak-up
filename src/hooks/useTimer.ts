import { useEffect, useRef, useState } from "react";

export function useTimer(
  totalSeconds: number,
  running: boolean,
  onDone?: () => void,
  startedAt?: string | null,
) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (!running) {
      setRemaining(totalSeconds);
      return;
    }

    const startTime = startedAt ? Date.parse(startedAt) : Date.now();
    let completed = false;
    const update = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const next = Math.max(0, totalSeconds - elapsed);
      setRemaining(next);
      if (next === 0 && !completed) {
        completed = true;
        doneRef.current?.();
      }
    };

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [running, startedAt, totalSeconds]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return {
    remaining,
    label: `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
    isFinalMinute: remaining <= 120,
    isFinalStretch: remaining <= 30,
  };
}
