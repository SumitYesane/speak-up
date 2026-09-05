import { motion, type HTMLMotionProps } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Phase = "idle" | "searching" | "connected";

export function ConnectionAnimation({
  phase = "idle",
  className,
  labels,
}: {
  phase?: Phase;
  className?: string;
  labels?: [string, string];
}) {
  const reduced = useReducedMotion();
  const connected = phase === "connected";

  const dot = (delay: number, dim: boolean): HTMLMotionProps<"span"> => ({
    animate: reduced
      ? { scale: 1, opacity: 1 }
      : { scale: dim ? [1, 1.06, 1] : [1, 1.12, 1], opacity: [0.85, 1, 0.85] },
    transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay },
  });

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="flex items-center justify-between gap-4">
        <Participant label={labels?.[0]} motionProps={dot(0, false)} />

        <div className="relative h-px flex-1">
          <div className="absolute inset-0 bg-border" />
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary"
            initial={{ width: "0%", opacity: 0.4 }}
            animate={{
              width: connected ? "100%" : phase === "searching" ? "62%" : "28%",
              opacity: connected ? 0.9 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 60, damping: 18 }}
          />
          {!reduced && (
            <motion.span
              className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary"
              animate={{ left: ["4%", "94%"], opacity: [0, 1, 0] }}
              transition={{
                duration: connected ? 3.2 : 4.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </div>

        <Participant label={labels?.[1]} motionProps={dot(1.4, !connected)} />
      </div>
    </div>
  );
}

function Participant({
  label,
  motionProps,
}: {
  label?: string | undefined;
  motionProps: HTMLMotionProps<"span">;
}) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <motion.span className="block size-3 rounded-full bg-primary" {...motionProps} />
      {label && (
        <span className="text-xs tracking-tight text-muted-foreground">{label}</span>
      )}
    </div>
  );
}
