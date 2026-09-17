import { Card } from "@/components/ui/card";

const DAYS = [
  {
    label: "Day 1",
    title: "Find the problem, then the shape of the fix",
    sessions: [
      "Pre - AI Readiness & Digital Citizenship",
      "1 - Problem & Solution",
      "2 - Team Formation & CXO Roles",
      "3 - Mentorship & Booking",
      "4 - Market, Competition & GTM",
      "5 - Product Logic & MVP",
    ],
  },
  {
    label: "Day 2",
    title: "Turn the fix into a business, then defend it",
    sessions: [
      "6 - Business Model Canvas",
      "7 - Financial Model",
      "8 - Pitch Deck & Visuals",
      "9 - Pitch Practice & Feedback",
      "10 - Final Pitch Presentation",
    ],
  },
];

export function StructureSection() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="bg-tint-peach rounded-2xl p-8 md:p-12">
        <p className="text-eyebrow text-ink-3 font-semibold uppercase">
          The structure
        </p>
        <h2 className="font-display text-ink mt-2 text-4xl font-normal">
          Two days. Four roles. One pitch.
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {DAYS.map((day) => (
            <Card key={day.label}>
              <p className="text-eyebrow text-ink-3 font-semibold uppercase">
                {day.label}
              </p>
              <h3 className="text-ink mt-1 font-sans text-lg font-semibold">
                {day.title}
              </h3>
              <ul className="mt-4 space-y-1.5">
                {day.sessions.map((session) => (
                  <li key={session} className="text-ink-2 text-sm">
                    {session}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
