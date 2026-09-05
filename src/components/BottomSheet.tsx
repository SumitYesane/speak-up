import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { ChevronUp } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function BottomSheet({
  open,
  onOpenChange,
  triggerLabel,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerLabel: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close prompts"
            className="pointer-events-auto fixed inset-0 bg-foreground/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="pointer-events-auto relative rounded-t-2xl border-t border-border bg-surface-raised shadow-lift"
        initial={false}
        animate={{ y: 0 }}
        transition={
          reduced
            ? { duration: 0.15 }
            : { type: "spring", stiffness: 320, damping: 34 }
        }
      >
        <button
          type="button"
          onClick={() => onOpenChange(!open)}
          aria-expanded={open}
          className="flex min-h-[56px] w-full items-center justify-between px-5 py-4 text-left"
        >
          <span className="text-[0.9375rem] text-foreground">{triggerLabel}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-muted-foreground">
            <ChevronUp className="size-4" aria-hidden />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0.15 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="max-h-[55vh] overflow-y-auto px-5 pb-[max(2rem,env(safe-area-inset-bottom))]">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
