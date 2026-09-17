import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export function ClosingCta() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h2 className="font-display text-ink text-5xl font-normal">
        Blank page today. Pitch by Demo Day.
      </h2>
      <p className="text-ink-2 mx-auto mt-4 max-w-md text-base">
        Bring your team of 4. Bootcamp AI brings the thinking partner for every
        stage.
      </p>
      <LinkButton href="/sign-up" size="lg" className="mt-8">
        Start your bootcamp
        <ArrowRight className="size-4" aria-hidden="true" />
      </LinkButton>
    </div>
  );
}
