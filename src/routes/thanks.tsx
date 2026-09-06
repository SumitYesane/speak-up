import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { AppBackground } from "@/components/AppBackground";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Route = createFileRoute("/thanks")({
  head: () => ({
    meta: [
      { title: "Thanks for practicing — SpeakUp" },
      {
        name: "description",
        content:
          "Thanks for practicing with SpeakUp. Your feedback helps make every conversation better.",
      },
      { property: "og:title", content: "Thanks for practicing — SpeakUp" },
      {
        property: "og:description",
        content: "Your feedback helps us make every conversation better.",
      },
    ],
  }),
  component: ThanksPage,
});

function ThanksPage() {
  const reduced = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: {
      duration: reduced ? 0.2 : 0.6,
      delay: reduced ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <AppBackground intensity="medium" />

      <header className="flex h-16 items-center px-6">
        <Link to="/" aria-label="SpeakUp home">
          <Logo />
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 pb-20 sm:px-6">
        <div className="w-full max-w-lg text-center">
          <motion.div
            initial={reduced ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="relative mx-auto grid size-20 place-items-center rounded-full bg-brand shadow-cta"
          >
            <Check className="size-9 text-primary-foreground" aria-hidden />
            <span
              aria-hidden
              className="absolute inset-0 -z-10 animate-aurora rounded-full bg-violet/40 blur-2xl"
            />
          </motion.div>

          <motion.h1 {...rise(0.12)} className="mt-9 text-display text-foreground">
            You showed up. That's what matters.
          </motion.h1>

          <motion.p
            {...rise(0.2)}
            className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed text-muted-foreground"
          >
            The next conversation might feel a little easier.
          </motion.p>

          <motion.div
            {...rise(0.3)}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/practice">
                <Sparkles className="size-4" aria-hidden />
                Talk Again
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link to="/">Done for Now</Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
