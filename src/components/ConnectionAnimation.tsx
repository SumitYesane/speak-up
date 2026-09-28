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
      : { scale: dim ? [1, 1.06, 1] : [1, 1.12, 1], opacity: [0.7, 1, 0.7] },
    transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay },
  });

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="flex items-center justify-between gap-4">
        <Participant label={labels?.[0]} motionProps={dot(0, false)} active={connected || phase === "searching"} />

        <div className="relative h-14 flex-1">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
          <div className="absolute inset-0 rounded-full bg-primary/[0.04] blur-xl" />
          <motion.div
            className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary via-violet to-cyan"
            initial={{ width: "0%", opacity: 0.2 }}
            animate={{
              width: connected ? "100%" : phase === "searching" ? "62%" : "28%",
              opacity: connected ? 0.9 : 0.6,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 22 }}
          />
          {!reduced && (
            <motion.span
              className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(140,92,255,0.12)]"
              animate={{ left: ["4%", "94%"], opacity: [0, 1, 0] }}
              transition={{
                duration: connected ? 3.2 : 4.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </div>

        <Participant label={labels?.[1]} motionProps={dot(1.4, !connected)} active={connected} />
      </div>
    </div>
  );
}

function Participant({
  label,
  motionProps,
  active,
}: {
  label?: string | undefined;
  motionProps: HTMLMotionProps<"span">;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <motion.span
        className={cn(
          "block size-3 rounded-full bg-primary shadow-[0_0_0_8px_rgba(255,255,255,0.7)]",
          active ? "bg-primary" : "bg-muted-foreground/60",
        )}
        {...motionProps}
      />
      {label && (
        <span className="text-[0.6875rem] font-medium tracking-[0.08em] text-muted-foreground uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
