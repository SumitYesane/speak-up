import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { FeedbackRating } from "@/components/FeedbackRating";
import { SegmentedChoice } from "@/components/SegmentedChoice";
import { PageTransition } from "@/components/PageTransition";
import { ErrorState } from "@/components/ErrorState";
import { AppBackground } from "@/components/AppBackground";
import { api } from "@/services/api";
import type { ComfortLevel, RepeatInterest } from "@/types/feedback";

const searchSchema = z.object({
  id: z.coerce.string().optional(),
  name: z.coerce.string().optional(),
});

export const Route = createFileRoute("/feedback")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "How was your conversation? — SpeakUp" },
      {
        name: "description",
        content:
          "Share how your SpeakUp conversation felt. It takes a few seconds and helps make the next one better.",
      },
      { property: "og:title", content: "How was your conversation? — SpeakUp" },
      {
        property: "og:description",
        content: "A few seconds of feedback makes the next conversation better.",
      },
    ],
  }),
  component: FeedbackPage,
});

const COMFORT: { value: ComfortLevel; label: string }[] = [
  { value: "very_comfortable", label: "Very comfortable" },
  { value: "comfortable", label: "Comfortable" },
  { value: "neutral", label: "Neutral" },
  { value: "uncomfortable", label: "A little uncomfortable" },
  { value: "very_uncomfortable", label: "Uncomfortable" },
];

const REPEAT: { value: RepeatInterest; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "maybe", label: "Maybe" },
  { value: "no", label: "No" },
];

const RATING_WORD = ["", "Rough one", "Not quite", "Decent", "Really good", "Loved it"];

const MAX_COMMENT = 400;
const SESSION_KEY = "speakup.session.id";

function FeedbackPage() {
  const navigate = useNavigate();
  const { id } = Route.useSearch();
  const [rating, setRating] = useState(0);
  const [comfort, setComfort] = useState<ComfortLevel | null>(null);
  const [repeat, setRepeat] = useState<RepeatInterest | null>(null);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const canSend = rating > 0 && comfort !== null && repeat !== null;
  const answered = [rating > 0, comfort !== null, repeat !== null].filter(Boolean).length;

  const send = async () => {
    if (!canSend) return;
    setSending(true);
    try {
      await api.sendFeedback({
        session_id: id ?? "",
        rating,
        comfort_level: comfort,
        repeat_interest: repeat,
        comment: comment.trim() ? comment.trim() : null,
      });
      window.sessionStorage.removeItem(SESSION_KEY);
      navigate({ to: "/thanks", replace: true });
    } catch {
      setSending(false);
      setFailed(true);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <AppBackground intensity="soft" />

      <header className="flex h-16 items-center px-6">
        <Link to="/" aria-label="SpeakUp home">
          <Logo />
        </Link>
      </header>

      <main className="flex flex-1 justify-center px-5 pt-4 pb-20 sm:px-6">
        <PageTransition className="w-full max-w-xl">
          {failed ? (
            <div className="card-elevated gradient-top mt-10 p-8">
              <ErrorState
                message="Looks like your connection was interrupted."
                onRetry={() => setFailed(false)}
              />
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="card-elevated gradient-top overflow-hidden p-7 sm:p-10"
            >
              <div className="text-center">
                <p className="text-eyebrow text-primary">One last thing</p>
                <h1 className="mt-3 text-[2rem] leading-tight tracking-[-0.03em] text-foreground">
                  How was your conversation?
                </h1>

                <div className="mt-7 flex justify-center">
                  <FeedbackRating value={rating} onChange={setRating} />
                </div>
                <p
                  className="mt-2 h-5 text-sm text-muted-foreground transition-opacity duration-200"
                  style={{ opacity: rating ? 1 : 0 }}
                >
                  {RATING_WORD[rating]}
                </p>
              </div>

              <div className="my-8 h-px hairline" aria-hidden />

              <div className="space-y-9">
                <SegmentedChoice
                  label="Did you feel comfortable speaking?"
                  options={COMFORT}
                  value={comfort}
                  onChange={setComfort}
                />

                <SegmentedChoice
                  label="Would you do another session?"
                  options={REPEAT}
                  value={repeat}
                  onChange={setRepeat}
                  columns="three"
                />

                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <label htmlFor="comment" className="text-[0.9375rem] text-foreground">
                      Anything you'd change for next time?{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <span className="tabular text-xs text-muted-foreground">
                      {comment.length}/{MAX_COMMENT}
                    </span>
                  </div>
                  <textarea
                    id="comment"
                    rows={4}
                    maxLength={MAX_COMMENT}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us anything that would make the next conversation better..."
                    className="mt-3 w-full resize-none rounded-[14px] border border-border bg-surface/80 p-4 text-[0.9375rem] text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                  />
                </div>
              </div>

              <div className="mt-9 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
                <p className="tabular text-sm text-muted-foreground">
                  {canSend ? "All set — thank you." : `${answered} of 3 answered`}
                </p>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={!canSend}
                  loading={sending}
                >
                  {sending ? "Sending" : "Send feedback"}
                </Button>
              </div>
            </form>
          )}
        </PageTransition>
      </main>
    </div>
  );
}
