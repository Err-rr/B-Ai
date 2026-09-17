import { Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <main className="bg-paper flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="bg-green text-on-accent inline-flex size-11 items-center justify-center rounded-xl">
        <Sparkles className="size-5" aria-hidden="true" />
      </span>
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
