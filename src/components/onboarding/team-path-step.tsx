"use client";

import { ArrowRight, UserPlus, Users, Zap } from "lucide-react";

export type TeamPath = "create" | "join";

export function TeamPathStep({
  selected,
  onSelect,
  onQuickStart,
}: {
  selected: TeamPath | null;
  onSelect: (path: TeamPath) => void;
  onQuickStart: () => void;
}) {
  const options = [
    {
      id: "create" as const,
      title: "Create a Team",
      description: "Start a new team and invite your co-founders.",
      icon: Users,
    },
    {
      id: "join" as const,
      title: "Join a Team",
      description: "Choose your CXO role on an existing team.",
      icon: UserPlus,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {options.map(({ id, title, description, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          aria-pressed={selected === id}
          className={`border-line bg-card rounded-2xl border p-5 text-left transition-[transform,box-shadow,border-color,filter] duration-200 ease-out ${
            selected === id
              ? "bg-tint-mint border-green shadow-soft scale-105"
              : "scale-95 opacity-70 grayscale hover:opacity-90"
          }`}
        >
          <span className="bg-paper text-ink-3 mb-3 inline-flex size-10 items-center justify-center rounded-xl">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <span className="text-ink block font-sans text-base font-semibold">
            {title}
          </span>
          <span className="text-ink-2 mt-1 block text-sm">{description}</span>
        </button>
      ))}
      <button
        type="button"
        onClick={onQuickStart}
        className="border-line bg-card hover:border-green rounded-2xl border p-5 text-left transition-colors duration-150 ease-out sm:col-span-3"
      >
        <span className="flex items-center gap-3">
          <span className="bg-stage-learn-tint text-stage-learn inline-flex size-10 items-center justify-center rounded-xl">
            <Zap className="size-5" aria-hidden="true" />
          </span>
          <span className="flex-1">
            <span className="text-ink block font-sans text-base font-semibold">
              Quick Start
            </span>
            <span className="text-ink-2 block text-sm">
              Explore the workspace on your own, no team needed.
            </span>
          </span>
          <ArrowRight className="text-ink-3 size-5" aria-hidden="true" />
        </span>
      </button>
    </div>
  );
}
