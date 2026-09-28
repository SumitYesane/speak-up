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
        "relative w-full max-w-[26rem] rounded-[30px] border border-[#efe8df] bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(249,247,243,0.86))] p-5 shadow-[0_18px_40px_-24px_rgba(95,75,117,0.35)] backdrop-blur-sm sm:p-6",
        className,
      )}
    >
      <div className="absolute inset-x-7 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(156,138,220,0.5),transparent)]" />

      <div className="flex flex-col gap-5">
        <div>
          {showLabel && (
            <p className="text-[0.7rem] font-medium tracking-[0.14em] text-muted-foreground/90 uppercase">
              Need a little help?
            </p>
          )}
          <div className={cn("min-h-[8.5rem]", showLabel && "mt-4")} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={prompt}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: reduced ? 0.15 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[24px] border border-[#efe5d8] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(252,247,242,0.82))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]"
              >
                <p className="text-[1.85rem] leading-[1.08] tracking-[-0.035em] text-foreground/95 sm:text-[2rem]">
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
            className="w-full justify-center rounded-2xl border border-[#eae0d0] bg-white/70 text-foreground shadow-[0_6px_14px_-8px_rgba(79,63,105,0.32)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_18px_-10px_rgba(79,63,105,0.34)]"
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
              className="w-full justify-center rounded-xl px-2 text-muted-foreground/90 transition-colors hover:bg-[#fff4ea] hover:text-foreground sm:w-auto"
            >
              <LogOut className="size-3.5" aria-hidden />
              Leave conversation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
