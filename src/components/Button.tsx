import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium select-none transition-[transform,background-color,box-shadow,color,border-color,opacity] duration-300 ease-out disabled:pointer-events-none disabled:cursor-not-allowed active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 motion-reduce:active:scale-100",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-primary-foreground shadow-[0_10px_28px_-14px_rgba(89,67,149,0.52)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-18px_rgba(89,67,149,0.52)] motion-reduce:hover:translate-y-0 before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(110deg,transparent,color-mix(in_oklab,white_45%,transparent),transparent)] before:transition-transform before:duration-700 hover:before:translate-x-full disabled:bg-none disabled:bg-muted disabled:text-muted-foreground/70 disabled:shadow-none disabled:before:hidden",
        secondary:
          "glass text-foreground hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_12px_30px_-24px_rgba(76,58,117,0.34)] motion-reduce:hover:translate-y-0 disabled:opacity-50",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-muted/80 disabled:opacity-50",
        quiet:
          "bg-accent text-accent-foreground hover:bg-accent/80 border border-transparent disabled:opacity-50",
      },

      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[0.9375rem]",
        lg: "h-[54px] px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild, loading, children, disabled, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";
