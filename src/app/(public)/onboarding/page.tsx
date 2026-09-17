import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { getNumberedSessions } from "@/lib/data/sessions";
import { getVenture } from "@/lib/data/venture";

export default async function OnboardingPage() {
  const [venture, sessions] = await Promise.all([
    getVenture(),
    getNumberedSessions(),
  ]);

  return (
    <OnboardingFlow
      initialVentureName={venture.name}
      initialVentureDescription={venture.description}
      sessions={sessions}
    />
  );
}
