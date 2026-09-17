import Link from "next/link";
import { LinkButton } from "@/components/ui/link-button";
import { Logo } from "@/components/ui/logo";

export function FloatingNav() {
  return (
    <div className="sticky top-4 z-40 mx-auto max-w-5xl px-4">
      <nav className="border-line bg-card shadow-soft flex items-center justify-between rounded-full border px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={32} />
          <span className="font-display text-ink text-xl font-normal">
            Bootcamp AI
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-ink-2 hover:text-ink hidden text-sm font-medium transition-colors duration-150 ease-out sm:block"
          >
            Sign in
          </Link>
          <LinkButton href="/sign-up" variant="dark" size="sm">
            Get started
          </LinkButton>
        </div>
      </nav>
    </div>
  );
}
