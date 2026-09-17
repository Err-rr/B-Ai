import { SegmentedProgress } from "@/components/ui/segmented-progress";
import { SESSION_STAGE_SEQUENCE } from "@/lib/utils/stage";
import { Section } from "./section";

const onboardingSegments = [
  { tone: "learn" as const, filled: true },
  { tone: "learn-to-build" as const, filled: true },
  { tone: "build" as const, filled: false },
];

const journeySegments = SESSION_STAGE_SEQUENCE.map((tone, index) => ({
  tone,
  filled: index <= 3,
}));

export function ProgressSection() {
  return (
    <Section title="Segmented progress">
      <div className="space-y-2">
        <p className="text-ink-3 text-xs">Onboarding - step 2 of 3</p>
        <SegmentedProgress
          segments={onboardingSegments}
          label="Onboarding progress"
        />
      </div>
      <div className="space-y-2">
        <p className="text-ink-3 text-xs">Workbench - 4 of 10 sessions</p>
        <SegmentedProgress
          segments={journeySegments}
          label="Bootcamp progress"
        />
      </div>
    </Section>
  );
}
