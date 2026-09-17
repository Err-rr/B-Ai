import Link from "next/link";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button";

export interface LinkButtonProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

/** A pill-shaped navigation link, visually identical to Button. */
export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)}>
      {children}
    </Link>
  );
}
