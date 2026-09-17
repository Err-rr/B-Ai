import { Section } from "./section";

const surfaceSwatches = [
  { name: "Paper (page)", className: "bg-paper" },
  { name: "Card", className: "bg-card" },
  { name: "Line (border)", className: "bg-line" },
  { name: "Track (progress)", className: "bg-track" },
];

const textSwatches = [
  { name: "Ink", className: "bg-ink" },
  { name: "Ink-2", className: "bg-ink-2" },
  { name: "Ink-3", className: "bg-ink-3" },
];

const actionSwatches = [
  { name: "Green - primary CTA", className: "bg-green" },
  { name: "Dark - Continue / Get started", className: "bg-dark" },
];

const stageSwatches = [
  { name: "Learn - blue", className: "bg-stage-learn" },
  { name: "Learn to Build - purple", className: "bg-stage-learn-to-build" },
  { name: "Build - gold", className: "bg-stage-build" },
  { name: "Launch - green", className: "bg-stage-launch" },
];

const landingTints = [
  { name: "Peach", className: "bg-tint-peach" },
  { name: "Mint", className: "bg-tint-mint" },
  { name: "Lavender", className: "bg-tint-lavender" },
];

const statusSwatches = [
  { name: "Success", fg: "text-success", bg: "bg-success-bg" },
  { name: "Warning", fg: "text-warning", bg: "bg-warning-bg" },
  { name: "Danger", fg: "text-danger", bg: "bg-danger-bg" },
];

const typeSteps = [
  {
    className: "text-7xl font-display font-normal",
    label: "Display XL - hero headlines (serif, 400)",
  },
  {
    className: "text-6xl font-display font-normal",
    label: "Display LG (serif, 400)",
  },
  {
    className: "text-5xl font-display font-normal",
    label: "Display MD (serif, 400)",
  },
  {
    className: "text-4xl font-display font-normal",
    label: "Display SM (serif, 400)",
  },
  {
    className: "text-3xl font-sans font-semibold",
    label: "Heading LG (sans, 600)",
  },
  {
    className: "text-2xl font-sans font-semibold",
    label: "Heading MD (sans, 600)",
  },
  {
    className: "text-xl font-sans font-semibold",
    label: "Heading SM (sans, 600)",
  },
  { className: "text-lg font-sans", label: "Body LG" },
  { className: "text-base font-sans", label: "Body MD" },
  { className: "text-sm font-sans", label: "Body SM" },
  { className: "text-xs font-sans", label: "Caption" },
  {
    className: "text-eyebrow font-sans font-semibold uppercase",
    label: "Eyebrow",
  },
];

const radii = [
  { name: "sm", className: "rounded-sm" },
  { name: "md", className: "rounded-md" },
  { name: "lg", className: "rounded-lg" },
  { name: "xl", className: "rounded-xl" },
  { name: "2xl", className: "rounded-2xl" },
  { name: "full", className: "rounded-full" },
];

function SwatchGrid({
  items,
}: {
  items: { name: string; className: string }[];
}) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map((s) => (
        <div key={s.name} className="space-y-2">
          <div
            className={`border-line h-16 rounded-lg border ${s.className}`}
          />
          <p className="text-ink-2 text-sm">{s.name}</p>
        </div>
      ))}
    </div>
  );
}

export function TokensSection() {
  return (
    <>
      <Section title="Surfaces">
        <SwatchGrid items={surfaceSwatches} />
      </Section>

      <Section title="Text">
        <SwatchGrid items={textSwatches} />
      </Section>

      <Section title="Actions">
        <SwatchGrid items={actionSwatches} />
      </Section>

      <Section title="Stage accents">
        <SwatchGrid items={stageSwatches} />
      </Section>

      <Section title="Landing section tints">
        <SwatchGrid items={landingTints} />
      </Section>

      <Section title="Semantic status">
        <div className="grid grid-cols-3 gap-4">
          {statusSwatches.map((s) => (
            <div
              key={s.name}
              className={`border-line rounded-lg border px-4 py-3 text-sm font-medium ${s.bg} ${s.fg}`}
            >
              {s.name}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Type scale">
        <div className="space-y-3">
          {typeSteps.map((t) => (
            <div key={t.label} className="flex items-baseline gap-4">
              <span className={`${t.className} text-ink`}>Bootcamp AI</span>
              <span className="text-ink-3 text-xs">{t.label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radius">
        <div className="flex flex-wrap gap-4">
          {radii.map((r) => (
            <div key={r.name} className="space-y-2 text-center">
              <div
                className={`border-line bg-card size-16 border ${r.className}`}
              />
              <p className="text-ink-3 text-xs">{r.name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Elevation">
        <div className="flex gap-6">
          <div className="border-line bg-card text-ink-2 shadow-hover rounded-xl border px-6 py-4 text-sm">
            shadow-hover
          </div>
          <div className="border-line bg-card text-ink-2 shadow-soft rounded-xl border px-6 py-4 text-sm">
            shadow-soft
          </div>
        </div>
      </Section>
    </>
  );
}
