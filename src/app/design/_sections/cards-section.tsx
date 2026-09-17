"use client";

import { Rocket, Target, Users } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SelectableCard } from "@/components/ui/selectable-card";
import { TintedPanel } from "@/components/ui/tinted-panel";
import { Section } from "./section";

const ROLE_CHOICES = [
  {
    id: "ceo",
    icon: Rocket,
    title: "CEO",
    description: "Owns the vision and the pitch.",
  },
  {
    id: "cto",
    icon: Target,
    title: "CTO",
    description: "Owns the product and the build.",
  },
  {
    id: "cmo",
    icon: Users,
    title: "CMO",
    description: "Owns the story and the market.",
  },
];

export function CardsSection() {
  const [selected, setSelected] = useState("ceo");

  return (
    <Section title="Cards, panels & selection">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <p className="text-ink font-sans text-lg font-semibold">
            Static card
          </p>
          <p className="text-ink-2 mt-1 text-sm">
            Hairline border, generous padding, no shadow.
          </p>
        </Card>
        <Card interactive>
          <p className="text-ink font-sans text-lg font-semibold">
            Interactive card
          </p>
          <p className="text-ink-2 mt-1 text-sm">
            Hover to see the lift and warmed border.
          </p>
        </Card>
      </div>

      <TintedPanel tone="build">
        <p className="text-eyebrow text-ink-3 mb-4 font-semibold uppercase">
          Tinted panel - Build stage
        </p>
        <Card>
          <p className="text-ink-2 text-sm">
            A tinted panel never nests another tinted panel - it holds white
            cards.
          </p>
        </Card>
      </TintedPanel>

      <div>
        <p className="text-ink-3 mb-3 text-sm">
          Selectable cards - dramatic selection contrast
        </p>
        <div className="grid grid-cols-3 gap-4">
          {ROLE_CHOICES.map((role) => (
            <SelectableCard
              key={role.id}
              icon={role.icon}
              title={role.title}
              description={role.description}
              selected={selected === role.id}
              onSelect={() => setSelected(role.id)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
