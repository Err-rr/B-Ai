import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/** A labeled text field. Focus ring comes from the global :focus-visible rule. */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="text-ink-2 text-sm font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "border-line bg-card text-ink placeholder:text-ink-3 hover:border-border-hover w-full rounded-xl border px-4 py-3 text-sm transition-colors duration-150 ease-out",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
