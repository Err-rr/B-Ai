import { ArrowRight, Sparkle } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { HeroIllustration } from "./hero-illustration";

export function Hero() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-16 pb-20">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="border-line bg-card text-ink-2 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
            <Sparkle className="text-stage-learn size-3.5" aria-hidden="true" />
            For ambitious student founders
          </span>
          <h1 className="font-display text-ink mt-6 text-7xl font-normal">
            10 sessions.
          </h1>
          <p className="text-ink-2 mt-4 max-w-md text-lg">
            Bootcamp AI walks your team of 4 from blank page to investor pitch,
            with a bespoke AI agent for every stage.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/sign-up" size="lg">
              Start your bootcamp
              <ArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="/sign-in" variant="secondary" size="lg">
              I have an account
            </LinkButton>
          </div>
        </div>
        <HeroIllustration />
      </div>
    </div>
  );
}
