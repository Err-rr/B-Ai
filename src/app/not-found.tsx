import { LinkButton } from "@/components/ui/link-button";
import { Logo } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <main className="bg-paper flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <Logo size={44} />
      <h1 className="font-display text-ink text-5xl font-normal">
        Page not found
      </h1>
      <p className="text-ink-2 max-w-sm text-sm">
        That page doesn&rsquo;t exist, or it moved. Let&rsquo;s get you back on
        track.
      </p>
      <LinkButton href="/" className="mt-2">
        Back to Bootcamp AI
      </LinkButton>
    </main>
  );
}
