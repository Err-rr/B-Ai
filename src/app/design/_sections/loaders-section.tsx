import { AIThinkingLoader } from "@/components/ui/loaders/ai-thinking-loader";
import { RouteTransitionLoader } from "@/components/ui/loaders/route-transition-loader";
import { Card } from "@/components/ui/card";
import { Section } from "./section";

const THINKING_MESSAGES = [
  "Reading your problem statement",
  "Checking competitors",
  "Drafting a first pass",
];

export function LoadersSection() {
  return (
    <Section title="Loading states">
      <div>
        <p className="text-ink-3 mb-2 text-xs">
          Route transition - shown by loading.tsx during navigation
        </p>
        <Card padding="sm">
          <RouteTransitionLoader compact />
        </Card>
      </div>
      <div>
        <p className="text-ink-3 mb-2 text-xs">
          AI thinking - carries the long waits, never a bare spinner
        </p>
        <Card>
          <AIThinkingLoader messages={THINKING_MESSAGES} />
        </Card>
      </div>
    </Section>
  );
}
