import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { Logo } from "@/components/Logo";
import { AppBackground } from "@/components/AppBackground";
import { Button } from "@/components/Button";
import { SessionTimer } from "@/components/SessionTimer";
import { ConversationPrompt } from "@/components/ConversationPrompt";
import { BottomSheet } from "@/components/BottomSheet";
import { ConnectionAnimation } from "@/components/ConnectionAnimation";
import { PageTransition } from "@/components/PageTransition";
import { useTimer } from "@/hooks/useTimer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { api } from "@/services/api";
import { APP_EVENTS, logger } from "@/services/logger";
import { FOLLOW_UPS, OPENING_PROMPTS, SESSION_LENGTH_SECONDS } from "@/config/prompts";

const searchSchema = z.object({
  id: z.coerce.string().optional(),
  name: z.coerce.string().optional(),
});

export const Route = createFileRoute("/session")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Your conversation — SpeakUp" },
      {
        name: "description",
        content:
          "A calm 10-minute practice conversation with a prompt whenever you need one.",
      },
      { property: "og:title", content: "Your conversation — SpeakUp" },
      {
        property: "og:description",
        content: "Ten quiet minutes to practice speaking, with gentle prompts.",
      },
    ],
  }),
  component: SessionPage,
});

function pick(list: string[], exclude?: string) {
  const options = exclude ? list.filter((item) => item !== exclude) : list;
  return options[Math.floor(Math.random() * options.length)] ?? list[0]!;
}

function SessionPage() {
  const navigate = useNavigate();
  const { id, name } = Route.useSearch();
  const [prompt, setPrompt] = useState(() => OPENING_PROMPTS[0]!);
  const [followUp, setFollowUp] = useState(() => FOLLOW_UPS[0]!);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [finished, setFinished] = useState(false);
  const [ending, setEnding] = useState(false);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const completing = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!id) return;

    void api
      .getSession(id)
      .then((current) => {
        setStartedAt(current.started_at);
        if (current.status === "COMPLETED") setFinished(true);
        if (current.status === "ACTIVE" && current.started_at) {
          const timerKey = `speakup.timer.started.${current.id}`;
          const resumed = window.sessionStorage.getItem(timerKey) === "true";
          window.sessionStorage.setItem(timerKey, "true");
          logger.info(resumed ? APP_EVENTS.TIMER_RESUMED : APP_EVENTS.TIMER_STARTED, {
            source: "timer",
            sessionId: current.id,
          });
        }
      })
      .catch(() => undefined);
  }, [id, name, navigate]);

  const timer = useTimer(
    SESSION_LENGTH_SECONDS,
    !finished && startedAt !== null,
    () => {
      if (!id || completing.current) return;
      completing.current = true;
      logger.info(APP_EVENTS.TIMER_COMPLETED, { source: "timer", sessionId: id });
      void api.completeSession(id, "timer").then(() => setFinished(true));
    },
    startedAt,
  );

  const another = () => {
    setPrompt((current) => pick(OPENING_PROMPTS, current));
    setFollowUp((current) => pick(FOLLOW_UPS, current));
  };

  const endSession = () => {
    if (!id || completing.current || ending) return;
    completing.current = true;
    setEnding(true);
    void api
      .completeSession(id, "manual")
      .then(() =>
        navigate({
          to: "/feedback",
          search: { id, name: name ?? "" },
          replace: true,
        }),
      )
      .catch(() => {
        completing.current = false;
        setEnding(false);
      });
  };

  const helper = useMemo(
    () => (
      <ConversationPrompt
        prompt={prompt}
        followUp={followUp}
        onAnother={another}
        onEndSession={endSession}
        ending={ending}
      />
    ),
    [prompt, followUp, ending],
  );

  const sheetHelper = useMemo(
    () => (
      <ConversationPrompt
        prompt={prompt}
        followUp={followUp}
        onAnother={another}
        onEndSession={endSession}
        ending={ending}
        showLabel={false}
      />
    ),
    [prompt, followUp, ending],
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <AppBackground intensity="soft" />

      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/80 bg-background/70 px-4 backdrop-blur-sm sm:px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden text-[0.8125rem] leading-none text-muted-foreground sm:inline">
            <span className="font-medium text-foreground">10 min</span> conversation
          </span>
        </div>
        {!finished && (
          <SessionTimer label={`${timer.label} remaining`} emphasized={timer.isFinalStretch} />
        )}
      </header>

      <AnimatePresence mode="wait">
        {finished ? (
          <PageTransition key="done" className="flex flex-1 items-center justify-center px-6 py-20">
            <div className="max-w-md text-center">
              <div className="card-elevated gradient-top p-7 sm:p-8">
                <ConnectionAnimation className="mx-auto" phase="connected" />
                <h1 className="mt-10 text-[2rem] leading-tight tracking-[-0.03em] text-foreground">
                  Nice work.
                  <span className="block text-muted-foreground">
                    You showed up and spoke.
                  </span>
                </h1>
                <p className="mt-4 text-[0.9375rem] text-muted-foreground">
                  Every conversation makes the next one a little easier.
                </p>
                <Button
                  size="lg"
                  className="mt-9 w-full"
                  onClick={() =>
                    navigate({
                      to: "/feedback",
                      search: { id: id ?? "", name: name ?? "" },
                    })
                  }
                >
                  Give feedback
                </Button>
              </div>
            </div>
          </PageTransition>
        ) : (
          <motion.main
            key="live"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid flex-1 lg:grid-cols-[1.6fr_0.9fr]"
          >
            <section className="relative flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
              <div className="absolute inset-x-8 top-8 h-40 rounded-full bg-[radial-gradient(circle,_rgba(255,209,163,0.34),_rgba(255,255,255,0)_68%)] blur-3xl" />
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[34rem] rounded-[32px] border border-[#efe2d4] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(250,246,242,0.86))] p-5 shadow-[0_24px_60px_-30px_rgba(114,89,149,0.38)] ring-1 ring-white/70 sm:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#ecd9bf] bg-[#fffaf3] px-2.5 py-1 text-[0.68rem] font-medium tracking-[0.12em] text-[#6b4e2a] uppercase">
                    <span className="size-2 rounded-full bg-[#f0c98c] shadow-[0_0_0_4px_rgba(240,201,140,0.2)]" />
                    live
                  </div>
                  {name ? (
                    <span className="text-[0.75rem] font-medium text-muted-foreground">
                      You’re speaking with {name}
                    </span>
                  ) : null}
                </div>

                <div className="mt-6">
                  <ConnectionAnimation
                    className="mx-auto"
                    phase="connected"
                    labels={["You", name || "Them"]}
                  />
                </div>

                <div className="mt-7 text-center">
                  <h1 className="text-[2.1rem] leading-[1.02] tracking-[-0.04em] text-foreground sm:text-[2.5rem]">
                    You’re all set.
                  </h1>
                  <p className="mt-4 text-[0.97rem] leading-relaxed text-muted-foreground">
                    Your conversation is open in another window.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80">
                    Take your time. There’s no perfect script here.
                  </p>
                </div>
              </motion.div>
            </section>

            <aside className="hidden border-l border-border/80 bg-background/30 px-8 py-10 lg:block">
              {helper}
            </aside>
          </motion.main>
        )}
      </AnimatePresence>

      {!finished && (
        <BottomSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          triggerLabel="Need a little help?"
        >
          {sheetHelper}
        </BottomSheet>
      )}
    </div>
  );
}
