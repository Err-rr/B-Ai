import { BadgesSection } from "./_sections/badges-section";
import { ButtonsSection } from "./_sections/buttons-section";
import { CardsSection } from "./_sections/cards-section";
import { LoadersSection } from "./_sections/loaders-section";
import { ProgressSection } from "./_sections/progress-section";
import { SkeletonsSection } from "./_sections/skeletons-section";
import { TokensSection } from "./_sections/tokens-section";

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-12 px-6 py-16">
      <header>
        <p className="text-eyebrow text-ink-3 font-semibold uppercase">
          Design system
        </p>
        <h1 className="font-display text-ink text-4xl font-normal">
          Bootcamp AI kit
        </h1>
      </header>

      <TokensSection />
      <ButtonsSection />
      <CardsSection />
      <BadgesSection />
      <ProgressSection />
      <LoadersSection />
      <SkeletonsSection />
    </main>
  );
}
