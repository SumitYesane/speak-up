import { useState } from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeedbackRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div
      role="radiogroup"
      aria-label="How was your conversation?"
      className="flex items-center gap-1"
      onMouseLeave={() => setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const on = star <= active;
        return (
          <motion.button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            onMouseEnter={() => setHovered(star)}
            onFocus={() => setHovered(star)}
            onBlur={() => setHovered(0)}
            onClick={() => onChange(star)}
            whileTap={{ scale: 0.88 }}
            animate={{
              scale: hovered === star ? 1.18 : on ? 1.04 : 1,
              rotate: hovered === star ? -6 : 0,
            }}
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
            className="grid size-14 place-items-center rounded-xl transition-colors hover:bg-accent/60"
          >
            <Star
              className={cn(
                "size-8 transition-colors duration-150",
                on ? "fill-amber text-amber drop-shadow-[0_2px_10px_var(--amber)]" : "text-border-strong",
              )}
              aria-hidden
            />

          </motion.button>
        );
      })}
    </div>
  );
}
