import { cn } from "@/lib/utils/cn";

export interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_CLASSES = {
  sm: "size-8 text-xs",
  md: "size-11 text-sm",
  lg: "size-16 text-lg",
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

/**
 * No photo uploads in this phase, so every avatar is initials on a
 * consistent brand tint — never a stage color, which would wrongly
 * imply the person represents a journey stage.
 */
export function Avatar({ name, size = "md", className }: AvatarProps) {
  return (
    <span
      className={cn(
        "bg-stage-learn-tint text-stage-learn inline-flex shrink-0 items-center justify-center rounded-full font-sans font-semibold",
        SIZE_CLASSES[size],
        className,
      )}
      title={name}
    >
      {initials(name)}
    </span>
  );
}
