import { cn } from "@/lib/utils/cn";
import { STAGE_CLASSES, type Stage } from "@/lib/utils/stage";

export interface TintedPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  tone: Stage;
}

/**
 * A soft-tinted section panel (landing page rhythm). Holds white
 * cards; never holds another tinted panel (see docs/DESIGN-SYSTEM.md).
 */
export function TintedPanel({
  tone,
  className,
  children,
  ...props
}: TintedPanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-8 md:p-12",
        STAGE_CLASSES[tone].tintBg,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
