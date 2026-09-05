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
      className={cn("flex items-center gap-2", className)}
      role="timer"
      aria-live="off"
    >
      <span className="sr-only">Time remaining</span>
      <span
        className={cn(
          "tabular text-[0.9375rem] tracking-tight transition-colors duration-500",
          emphasized ? "font-medium text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </div>
  );
}
