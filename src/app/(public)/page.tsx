import { getNumberedSessions } from "@/lib/data/sessions";
import { ClosingCta } from "@/components/landing/closing-cta";
import { FeatureCards } from "@/components/landing/feature-cards";
import { FloatingNav } from "@/components/landing/floating-nav";
import { Hero } from "@/components/landing/hero";
import { JourneySection } from "@/components/landing/journey-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { StructureSection } from "@/components/landing/structure-section";

/**
 * Route: "/" — the public Dashboard (landing page). See D-001 for why
 * "Dashboard" names this page rather than a signed-in view.
 */
export default async function DashboardPage() {
  const sessions = await getNumberedSessions();

  return (
    <div className="min-h-screen">
      <FloatingNav />
      <main className="space-y-20 pb-20">
        <Hero />
        <FeatureCards />
        <JourneySection sessions={sessions} />
        <StructureSection />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
