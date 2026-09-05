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
      })
      .catch(() => undefined);
  }, [id, name, navigate]);

  const timer = useTimer(
    SESSION_LENGTH_SECONDS,
    !finished && startedAt !== null,
    () => {
      if (!id || completing.current) return;
      completing.current = true;
      void api.completeSession(id).then(() => setFinished(true));
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
      .completeSession(id)
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

      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden text-sm text-muted-foreground sm:inline">
            10-minute practice
          </span>
        </div>
        {!finished && (
          <SessionTimer label={timer.label} emphasized={timer.isFinalStretch} />
        )}
      </header>

      <AnimatePresence mode="wait">
        {finished ? (
          <PageTransition key="done" className="flex flex-1 items-center justify-center px-6 py-20">
            <div className="max-w-md text-center">
              <ConnectionAnimation className="mx-auto" phase="connected" />
              <h1 className="mt-12 text-[2rem] leading-tight tracking-[-0.03em] text-foreground">
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
                className="mt-9"
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
          </PageTransition>
        ) : (
          <motion.main
            key="live"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid flex-1 lg:grid-cols-[1.7fr_1fr]"
          >
            <section className="flex items-center justify-center px-6 pt-10 pb-32 lg:py-0">
              <div className="w-full max-w-sm text-center">
                <ConnectionAnimation
                  className="mx-auto"
                  phase="connected"
                  labels={[name || "You", "Them"]}
                />
                <p className="mt-10 text-[0.9375rem] text-muted-foreground">
                  Your conversation is open in another window.
                </p>
                <p className="mt-2 text-sm text-muted-foreground/80">
                  There's no right answer. Just keep the conversation going.
                </p>
              </div>
            </section>

            <aside className="hidden border-l border-border px-8 py-10 lg:block">
              {helper}
            </aside>
          </motion.main>
        )}
      </AnimatePresence>

      {!finished && (
        <BottomSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          triggerLabel="Not sure what to say?"
        >
          {sheetHelper}
        </BottomSheet>
      )}
    </div>
  );
}
