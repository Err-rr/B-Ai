import { cn } from "@/lib/utils/cn";

/**
 * The base shimmer block. Compose it into shapes that match the real
 * content (a card, a message row, a stat) - never a bare grey
 * rectangle standing in for a whole screen.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      role="presentation"
      className={cn("bg-track animate-pulse rounded-md", className)}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-line bg-card flex flex-col gap-4 rounded-2xl border p-6",
        className,
      )}
    >
      <Skeleton className="size-11 rounded-xl" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}

export function SkeletonRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}
