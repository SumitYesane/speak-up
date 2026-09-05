import { Button } from "@/components/Button";

export function ErrorState({
  message = "Something went wrong while preparing your session.",
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}) {
  return (
    <div className="mx-auto max-w-sm text-center" role="alert">
      <div
        className="mx-auto flex w-fit items-center gap-2 text-muted-foreground"
        aria-hidden
      >
        <span className="size-2 rounded-full bg-border-strong" />
        <span className="h-px w-10 bg-border" />
        <span className="size-2 rounded-full bg-border-strong" />
      </div>
      <p className="mt-6 text-lg leading-snug tracking-[-0.015em] text-foreground">
        {message}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Nothing was lost. You can pick this up again right away.
      </p>
      <Button className="mt-7" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
