import { cn } from "@/lib/utils";

export function Logo({
  className,
  showMark = true,
}: {
  className?: string;
  showMark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {showMark && (
        <svg
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          aria-hidden
          className="text-primary"
        >
          <circle cx="2.5" cy="7" r="2.5" fill="currentColor" />
          <path
            d="M6.5 7c2.5 0 2.5-4 5-4s2.5 4 5 4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.55"
          />
          <circle cx="17.5" cy="7" r="2.5" fill="currentColor" opacity="0.35" />
        </svg>
      )}
      <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-foreground">
        Speak<span className="font-normal text-muted-foreground">Up</span>
      </span>
    </span>
  );
}
