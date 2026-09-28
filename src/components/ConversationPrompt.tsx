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
    <div
      className={cn(
        "relative w-full max-w-[26rem] rounded-[30px] border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(249,247,244,0.82))] p-5 shadow-[0_8px_28px_-18px_rgba(83,62,120,0.28)] backdrop-blur-xl sm:p-6",
        className,
      )}
    >
      <div className="absolute inset-x-7 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(122,116,255,0.75),transparent)]" />

      <div className="flex flex-col gap-5">
        <div>
          {showLabel && (
            <p className="text-eyebrow text-muted-foreground/90">Not sure what to say?</p>
          )}
          <div className={cn("min-h-[7rem]", showLabel && "mt-4")} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={prompt}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: reduced ? 0.15 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[22px] border border-border/80 bg-white/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
              >
                <p className="text-[2rem] leading-[1.06] tracking-[-0.035em] text-foreground/95">
                  {prompt}
                </p>
                <p className="mt-3 text-[0.97rem] leading-relaxed text-muted-foreground/90">
                  {followUp}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={onAnother}
            className="w-full justify-center rounded-2xl border border-border/80 bg-white/60 text-foreground shadow-[0_4px_12px_-8px_rgba(71,60,120,0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/80"
          >
            <RefreshCw className="size-3.5" aria-hidden />
            Another idea
          </Button>

          {onEndSession && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onEndSession}
              loading={ending}
              className="w-full justify-center rounded-xl px-2 text-muted-foreground/90 transition-colors hover:bg-destructive/8 hover:text-destructive sm:w-auto"
            >
              <LogOut className="size-3.5" aria-hidden />
              End session
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
