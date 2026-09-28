import { cn } from "@/lib/utils";

export function SessionTimer({
  label,
  emphasized = false,
  className,
}: {
  label: string;
  emphasized?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-border/80 bg-white/70 px-3 py-1.5 shadow-[0_1px_2px_rgba(17,24,39,0.04)] backdrop-blur-sm",
        emphasized && "border-amber-200/80 bg-amber-50/80",
        className,
      )}
      role="timer"
      aria-live="off"
    >
      <span className="sr-only">Time remaining</span>
      <span
        className={cn(
          "tabular text-[0.8125rem] tracking-[-0.01em] transition-colors duration-500 sm:text-[0.875rem]",
          emphasized ? "font-semibold text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </div>
  );
}
