import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { SegmentedChoice } from "@/components/SegmentedChoice";
import { PageTransition } from "@/components/PageTransition";
import { ErrorState } from "@/components/ErrorState";
import { AppBackground } from "@/components/AppBackground";
import { api } from "@/services/api";
import type { PostSessionChallenge, PostSessionFeeling, RepeatIntention } from "@/types/feedback";

const searchSchema = z.object({
  id: z.coerce.string().optional(),
  name: z.coerce.string().optional(),
});

export const Route = createFileRoute("/feedback")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "How did that feel? — SpeakUp" },
      {
        name: "description",
        content: "Take a second to reflect on your SpeakUp conversation.",
      },
      { property: "og:title", content: "How did that feel? — SpeakUp" },
      {
        property: "og:description",
        content: "Take a second to reflect on your SpeakUp conversation.",
      },
    ],
  }),
  component: FeedbackPage,
});

const FEELINGS: { value: PostSessionFeeling; label: string }[] = [
  { value: "quite_nervous", label: "Quite nervous" },
  { value: "a_little_nervous", label: "A little nervous" },
  { value: "somewhere_in_between", label: "Somewhere in between" },
  { value: "pretty_comfortable", label: "Pretty comfortable" },
  { value: "very_comfortable", label: "Very comfortable" },
];

const CHALLENGES: { value: PostSessionChallenge; label: string }[] = [
  { value: "finding_right_words", label: "Finding the right words" },
  { value: "starting_a_thought", label: "Starting a thought" },
  { value: "keeping_conversation_going", label: "Keeping the conversation going" },
  { value: "not_overthinking", label: "Not overthinking" },
  { value: "speaking_confidently", label: "Speaking confidently" },
  { value: "nothing_in_particular", label: "Nothing in particular" },
];

const REPEAT: { value: RepeatIntention; label: string }[] = [
  { value: "yes", label: "Yes, I'd like that" },
  { value: "maybe", label: "Maybe, I'd like to try again" },
  { value: "not_now", label: "Not right now" },
];

const MAX_COMMENT = 400;
const SESSION_KEY = "speakup.session.id";

function FeedbackPage() {
  const navigate = useNavigate();
  const { id } = Route.useSearch();
  const [feeling, setFeeling] = useState<PostSessionFeeling | null>(null);
  const [challenge, setChallenge] = useState<PostSessionChallenge | null>(null);
  const [repeat, setRepeat] = useState<RepeatIntention | null>(null);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const canSend = feeling !== null && challenge !== null && repeat !== null;
  const answered = [feeling !== null, challenge !== null, repeat !== null].filter(Boolean).length;

  const send = async () => {
    if (!canSend) return;
    setSending(true);
    try {
      await api.sendFeedback({
        session_id: id ?? "",
        post_session_feeling: feeling,
        post_session_challenge: challenge,
        repeat_intention: repeat,
        optional_feedback: comment.trim() ? comment.trim() : null,
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
                <p className="text-eyebrow text-primary">After the conversation</p>
                <h1 className="mt-3 text-[2rem] leading-tight tracking-[-0.03em] text-foreground">
                  How did that feel?
                </h1>
                <p className="mt-3 text-sm text-muted-foreground">
                  Take a second. There are no right answers.
                </p>
              </div>

              <div className="my-8 h-px hairline" aria-hidden />

              <div className="space-y-9">
                <SegmentedChoice
                  label="How did you feel while talking?"
                  options={FEELINGS}
                  value={feeling}
                  onChange={setFeeling}
                />

                <SegmentedChoice
                  label="What felt hardest today?"
                  description="Pick the one that felt closest."
                  options={CHALLENGES}
                  value={challenge}
                  onChange={setChallenge}
                  columns="three"
                />

                <SegmentedChoice
                  label="Would you like to do this again?"
                  options={REPEAT}
                  value={repeat}
                  onChange={setRepeat}
                  columns="three"
                />

                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <label htmlFor="comment" className="text-[0.9375rem] text-foreground">
                      Anything you'd like to tell us?{" "}
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
                    placeholder="Something that felt good, something that felt awkward, or anything you'd change."
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
                  {sending ? "Saving" : "Done"}
                </Button>
              </div>
            </form>
          )}
        </PageTransition>
      </main>
    </div>
  );
}
