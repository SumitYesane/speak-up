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
        <Participant
          label={labels?.[0] ?? "You"}
          motionProps={dot(0, false)}
          active={connected || phase === "searching"}
          tone="warm"
        />

        <div className="relative h-16 flex-1">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute inset-y-2 left-1/2 w-12 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(126,92,255,0.12),_transparent_68%)] blur-2xl" />
          <motion.div
            className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#f7d7b3] via-[#b9a7ff] to-[#8cc8ff]"
            initial={{ width: "0%", opacity: 0.2 }}
            animate={{
              width: connected ? "100%" : phase === "searching" ? "62%" : "28%",
              opacity: connected ? 0.9 : 0.7,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 22 }}
          />
          {!reduced && (
            <motion.span
              className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_5px_rgba(120,100,238,0.12)]"
              animate={{ left: ["4%", "94%"], opacity: [0, 1, 0] }}
              transition={{
                duration: connected ? 3.2 : 4.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </div>

        <Participant
          label={labels?.[1] ?? "Them"}
          motionProps={dot(1.4, !connected)}
          active={connected}
          tone="cool"
        />
      </div>
    </div>
  );
}

function Participant({
  label,
  motionProps,
  active,
  tone,
}: {
  label?: string | undefined;
  motionProps: HTMLMotionProps<"span">;
  active?: boolean;
  tone: "warm" | "cool";
}) {
  const initials = label
    ?.split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "Y";

  return (
    <div className="flex flex-col items-center gap-2.5">
      <motion.div
        className={cn(
          "flex size-11 items-center justify-center rounded-full border text-[0.625rem] font-semibold shadow-[0_8px_20px_-10px_rgba(86,68,128,0.25)] ring-1 ring-white/60",
          active
            ? tone === "warm"
              ? "border-[#f2d6b2] bg-gradient-to-br from-[#f7dcc0] via-[#f5c790] to-[#f0b973] text-[#533c29]"
              : "border-[#d9d2ff] bg-gradient-to-br from-[#e8e0ff] via-[#d8d1ff] to-[#bfd0ff] text-[#433f66]"
            : "border-border bg-muted text-muted-foreground",
        )}
        {...motionProps}
      >
        {initials}
      </motion.div>
      {label && (
        <span className="max-w-[6rem] truncate text-center text-[0.6875rem] leading-tight text-muted-foreground/90">
          {label}
        </span>
      )}
    </div>
  );
}
