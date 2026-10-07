import Image from "next/image";
import { cn } from "@/lib/utils/cn";

/** The YFS mark, used everywhere the app previously showed a sparkle badge. */
export function Logo({
  size = 32,
  alt = "Bootcamp AI",
  className,
}: {
  size?: number;
  alt?: string;
  className?: string;
}) {
  return (
    <span
      className={cn("relative inline-block shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/reference/logo.png"
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-contain"
      />
    </span>
  );
}
