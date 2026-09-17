import { Loader2 } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "dark" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-green text-on-accent hover:brightness-105 active:brightness-95",
  dark: "bg-dark text-on-dark hover:brightness-125 active:brightness-95",
  secondary:
    "bg-card text-ink border border-line hover:border-border-hover hover:bg-paper/60",
  ghost: "bg-transparent text-ink-2 hover:bg-paper hover:text-ink",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-14 px-8 text-base gap-2",
  icon: "size-10 p-0",
};

/** Shared with LinkButton so a navigating pill looks identical to a real button. */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(
    "inline-flex shrink-0 items-center justify-center rounded-full font-sans font-semibold whitespace-nowrap transition-[color,background-color,border-color,filter,transform] duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );
}

/**
 * The one interactive pill shape in the app. `primary` (green) is the
 * single main action per screen (see docs/DESIGN-SYSTEM.md); `dark` is
 * reserved for "Continue" and "Get started"; `secondary`/`ghost` are
 * for everything else.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={buttonClasses(variant, size, className)}
        {...props}
      >
        {loading && (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
