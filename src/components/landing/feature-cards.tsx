import { Sparkles, Trophy, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Users,
    tint: "bg-tint-lavender",
    iconColor: "text-stage-learn-to-build",
    title: "Form a team of 4",
    body: "Pick CEO, CTO, CMO, CFO. Track who is driving every step.",
  },
  {
    icon: Sparkles,
    tint: "bg-tint-mint",
    iconColor: "text-stage-launch",
    title: "Bespoke AI per stage",
    body: "Not a chatbot. A purpose-built tool for each session.",
  },
  {
    icon: Trophy,
    tint: "bg-tint-peach",
    iconColor: "text-stage-build",
    title: "Pitch on Demo Day",
    body: "End with a polished deck, a scored pitch, and real mentors.",
  },
];

export function FeatureCards() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-3">
      {FEATURES.map((feature) => (
        <Card key={feature.title}>
          <span
            className={`mb-4 inline-flex size-11 items-center justify-center rounded-xl ${feature.tint} ${feature.iconColor}`}
          >
            <feature.icon className="size-5" aria-hidden="true" />
          </span>
          <h3 className="text-ink font-sans text-lg font-semibold">
            {feature.title}
          </h3>
          <p className="text-ink-2 mt-1 text-sm">{feature.body}</p>
        </Card>
      ))}
    </div>
  );
}
