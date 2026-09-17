import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds hover lift + warmed border + pointer cursor, for clickable cards. */
  interactive?: boolean;
  padding?: "sm" | "md" | "lg";
}

const PADDING_CLASSES = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

/**
 * The primary unit of the interface. Defined by a hairline border and
 * generous padding, never by a drop shadow - shadow only appears on
 * hover/selection (see docs/DESIGN-SYSTEM.md).
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ interactive, padding = "md", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border-line bg-card rounded-2xl border",
          PADDING_CLASSES[padding],
          interactive &&
            "hover:border-border-hover hover:shadow-hover cursor-pointer transition-[border-color,box-shadow,transform] duration-150 ease-out hover:-translate-y-0.5",
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";
