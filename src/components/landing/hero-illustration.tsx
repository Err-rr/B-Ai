import { Hammer, Lightbulb, Rocket, Trophy } from "lucide-react";
import Image from "next/image";
import { STAGE_CLASSES } from "@/lib/utils/stage";

const STEPS = [
  { icon: Lightbulb, tone: "learn" as const, label: "Learn" },
  { icon: Hammer, tone: "learn-to-build" as const, label: "Learn to Build" },
  { icon: Rocket, tone: "build" as const, label: "Build" },
  { icon: Trophy, tone: "launch" as const, label: "Launch" },
];

const OFFSETS = [
  "translate-x-0",
  "translate-x-[8px] sm:translate-x-[16px]",
  "translate-x-[16px] sm:translate-x-[32px]",
  "translate-x-[24px] sm:translate-x-[48px]",
];

/**
 * A flat geometric preview of the stage arc - no stock photography or
 * 3D renders, per the brief. Cascading rather than a literal chart.
 * `overflow-hidden` is a safety net: the translated rows are visual
 * transform offsets (they don't affect layout width), so without it
 * they could bleed past the card at narrow viewports.
 */
export function HeroIllustration() {
  return (
    <div className="border-line bg-card shadow-soft flex items-stretch gap-4 overflow-hidden rounded-2xl border p-8">
      <div className="flex w-1/2 min-w-0 flex-col justify-center gap-4 sm:w-[35%]">
        {STEPS.map((step, index) => {
          const stage = STAGE_CLASSES[step.tone];
          return (
            <div
              key={step.tone}
              className={`flex items-center gap-3 ${OFFSETS[index]}`}
            >
              <span
                className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${stage.bg} text-on-accent`}
              >
                <step.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-ink text-sm font-medium">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative w-1/2 shrink-0 sm:w-[65%]">
        <Image
          src="/reference/boy.png"
          alt=""
          fill
          sizes="65vw"
          className="object-cover object-right"
        />
      </div>
    </div>
  );
}
