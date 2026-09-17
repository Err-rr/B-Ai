"use client";

import { ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "./section";

const VARIANTS = ["primary", "dark", "secondary", "ghost"] as const;
const SIZES = ["sm", "md", "lg"] as const;

export function ButtonsSection() {
  const [loading, setLoading] = useState(false);

  return (
    <Section title="Buttons">
      <div className="space-y-6">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-3">
            <span className="text-ink-3 w-20 text-sm capitalize">
              {variant}
            </span>
            {SIZES.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {variant === "dark" ? "Continue" : "Get started"}
              </Button>
            ))}
            <Button variant={variant} disabled>
              Disabled
            </Button>
          </div>
        ))}

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-ink-3 w-20 text-sm">With icon</span>
          <Button variant="primary">
            Start your bootcamp
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button variant="secondary" size="icon" aria-label="Add">
            <Plus className="size-5" aria-hidden="true" />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-ink-3 w-20 text-sm">Loading</span>
          <Button
            variant="primary"
            loading={loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1800);
            }}
          >
            {loading ? "Saving" : "Click to load"}
          </Button>
        </div>
      </div>
    </Section>
  );
}
