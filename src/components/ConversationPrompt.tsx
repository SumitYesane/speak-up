import { AnimatePresence, motion } from "motion/react";
import { LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function ConversationPrompt({
  prompt,
  followUp,
  onAnother,
  onEndSession,
  ending,
  className,
  showLabel = true,
}: {
  prompt: string;
  followUp: string;
  onAnother: () => void;
  onEndSession?: () => void;
  ending?: boolean;
  className?: string;
  showLabel?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div>
        {showLabel && (
          <p className="text-eyebrow text-muted-foreground">Not sure what to say?</p>
        )}
        <div className={cn("min-h-[6.5rem]", showLabel && "mt-5")} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={prompt}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduced ? 0.15 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[1.375rem] leading-snug tracking-[-0.02em] text-foreground">
                {prompt}
              </p>
              <p className="mt-4 text-[0.9375rem] text-muted-foreground">{followUp}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Button variant="secondary" size="sm" onClick={onAnother} className="self-start">
        <RefreshCw className="size-3.5" aria-hidden />
        Another idea
      </Button>
      {onEndSession && (
        <div className="mt-1 border-t border-border/70 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEndSession}
            loading={ending}
            className="self-start px-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-3.5" aria-hidden />
            End session
          </Button>
        </div>
      )}
    </div>
  );
}
