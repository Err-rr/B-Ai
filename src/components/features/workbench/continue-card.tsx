import { ArrowRight } from "lucide-react";
import type { Session } from "@/lib/types/domain";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { TintedPanel } from "@/components/ui/tinted-panel";

/** The hero of the page — the one thing a student should read first. */
export function ContinueCard({ session }: { session: Session }) {
  return (
    <TintedPanel tone={session.stage}>
      <Card className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-eyebrow text-ink-3 mb-2 font-semibold uppercase">
            Continue where you left off
          </p>
          <h3 className="text-ink font-sans text-xl font-semibold">
            Session {session.number} · {session.title}
          </h3>
          <p className="text-ink-2 mt-1 text-sm">
            You&rsquo;ll walk away with: {session.artifact}
          </p>
        </div>
        <LinkButton href="/chat" className="w-full shrink-0 lg:w-auto">
          Continue in Chat
          <ArrowRight className="size-4" aria-hidden="true" />
        </LinkButton>
      </Card>
    </TintedPanel>
  );
}
