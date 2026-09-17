# Design system

Token reference and component inventory. Every value here traces back to `src/styles/tokens.css`; nothing in a component should hardcode a color, size, radius, shadow or duration that isn't one of these.

## Rules

- **One primary pill per screen.** The solid green button marks the single main action. `dark` (near-black) is reserved specifically for "Continue" (onboarding) and "Get started" (nav). Everything else is `secondary` (bordered) or `ghost` (text only).
- **Green is the only primary action color.** It never doubles as decoration.
- **Stage colors are accents, never fills.** Blue → purple → gold → green signal position in the journey (Learn → Learn to Build → Build → Launch) as a badge, a thin progress segment, a dot, an icon tint, a left-border accent, or a ~7% tinted wash. A stage color never covers a large area solid.
- **Tinted panels never nest.** A tinted section panel holds white cards; it never holds another tinted panel.
- **The serif is for display moments only.** `font-display` (Instrument Serif, weight 400 — it has no other weight) is reserved for `text-4xl` and up: hero headlines and genuinely large standalone numbers. Never bold it. Card titles, section headings and everything else use `font-sans` (Inter) at up to weight 600.
- **Every size is a token.** Colors, spacing (Tailwind's default 0.25rem-based scale), font sizes, radii, shadows and motion durations all come from `tokens.css` via the `@theme` mapping — never an arbitrary value in a component.

## Color tokens

| Token                        | Utility                                           | Light                                                                | Dark                                | Meaning                                                                              |
| ---------------------------- | ------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------ |
| `--paper`                    | `bg-paper`                                        | `#F5F4F0`                                                            | `#171613`                           | Page background — warm off-white, never pure white                                   |
| `--card`                     | `bg-card`                                         | `#FFFFFF`                                                            | `#201E1A`                           | Card surfaces                                                                        |
| `--line`                     | `border-line`                                     | `#E8E7E3`                                                            | `#35322C`                           | Hairline borders                                                                     |
| `--track`                    | `bg-track`                                        | `#E5E5E5`                                                            | `#3D3A33`                           | Progress bar track, unfilled segments, skeleton fill                                 |
| `--border-hover`             | `border-border-hover`                             | `#D6D4CC`                                                            | `#4A4640`                           | Warmed border on hover                                                               |
| `--ink`                      | `text-ink`                                        | `#111111`                                                            | `#F5F4F0`                           | Headings                                                                             |
| `--ink-2`                    | `text-ink-2`                                      | `#3A3A3C`                                                            | `#C7C4BC`                           | Body text                                                                            |
| `--ink-3`                    | `text-ink-3`                                      | `#737373`                                                            | `#8C8880`                           | Meta text, eyebrow labels                                                            |
| `--green`                    | `bg-green`                                        | `#00BC5C`                                                            | `#22D67A`                           | The one primary CTA color                                                            |
| `--dark`                     | `bg-dark`                                         | `#26262A`                                                            | `#F5F4F0` (inverts to a light pill) | "Continue" / "Get started" only                                                      |
| `--on-accent`                | `text-on-accent`                                  | `#111111`                                                            | `#111111`                           | Text on `--green` — white fails AA on this green (~2.5:1); dark ink passes at ~7.5:1 |
| `--on-dark`                  | `text-on-dark`                                    | `#FFFFFF`                                                            | `#111111`                           | Text on `--dark`                                                                     |
| stage tints                  | `bg-stage-{learn\|learn-to-build\|build\|launch}` | blue `#4A7DEC` · purple `#8B5CF6` · gold `#F5C13D` · green `#00BC5C` | brightened                          | The four journey stages                                                              |
| stage tints (wash)           | `bg-stage-*-tint`                                 | `color-mix()` 7% wash toward white/card                              | 7% wash toward the dark card        | Panel/badge backgrounds behind a stage color                                         |
| `--tint-peach/mint/lavender` | `bg-tint-{peach\|mint\|lavender}`                 | pale washes                                                          | dark washes                         | Landing-page section panels — rotate for rhythm, not stage-tied                      |
| `--success` / `--success-bg` | `text-success` / `bg-success-bg`                  | `#16A672` / `#E3F7EE`                                                | `#34D399` / `#113828`               | Approval, positive states                                                            |
| `--warning` / `--warning-bg` | `text-warning` / `bg-warning-bg`                  | `#C2760A` / `#FBF0DC`                                                | `#F2A93C` / `#3A2A10`               | Needs attention                                                                      |
| `--danger` / `--danger-bg`   | `text-danger` / `bg-danger-bg`                    | `#E23F55` / `#FDE8EB`                                                | `#FF6B81` / `#3A1620`               | Errors, destructive actions                                                          |

Full rationale for the palette pivot, the tint formula, and the green/on-accent contrast fix: `docs/DECISIONS.md` D-007, D-008, D-015.

## Type scale

Implemented on Tailwind's numeric `text-*` utilities (D-005, revised D-015) — always use these, never an arbitrary size:

| Utility                             | Size                   | Family / weight             | Role                                                            |
| ----------------------------------- | ---------------------- | --------------------------- | --------------------------------------------------------------- |
| `text-7xl` (and capped `8xl`/`9xl`) | 76px / 1.0 / 0em       | `font-display`, 400 only    | Display XL — landing hero only                                  |
| `text-6xl`                          | 56px / 1.0 / 0em       | `font-display`, 400 only    | Display LG                                                      |
| `text-5xl`                          | 40px / 1.02 / 0em      | `font-display`, 400 only    | Display MD                                                      |
| `text-4xl`                          | 30px / 1.05 / 0em      | `font-display`, 400 only    | Display SM — smallest serif step; also large standalone numbers |
| `text-3xl`                          | 24px / 1.22 / -0.01em  | `font-sans`, 600            | Heading LG                                                      |
| `text-2xl`                          | 20px / 1.3 / -0.008em  | `font-sans`, 600            | Heading MD                                                      |
| `text-xl`                           | 18px / 1.35 / -0.005em | `font-sans`, 600            | Heading SM                                                      |
| `text-lg`                           | 18px / 1.6             | `font-sans`, 400–500        | Body LG                                                         |
| `text-base`                         | 16px / 1.6             | `font-sans`, 400            | Body MD (default)                                               |
| `text-sm`                           | 14px / 1.55            | `font-sans`, 400            | Body SM                                                         |
| `text-xs`                           | 13px / 1.4             | `font-sans`, 400            | Caption                                                         |
| `text-eyebrow`                      | 12px / 1.2 / +0.08em   | `font-sans`, 600, uppercase | Uppercase label                                                 |

`font-display` is Instrument Serif — it ships only weight 400, so never pair it with `font-semibold`/`font-bold` (synthetic bold looks broken). Its presence comes from size, not weight. Everything else is Inter, capped at weight 600.

## Radius

`rounded-sm` 10px · `rounded-md` 14px · `rounded-lg` 18px · `rounded-xl` 22px · `rounded-2xl` 28px · `rounded-full` pills.

## Elevation

`shadow-hover` — soft 4-12px lift for hover states. `shadow-soft` — the one shadow strong enough for a focused/selected element. No component should reach for an ad hoc box-shadow.

## Motion

`--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`) for entrances, `--ease-in-out` for state changes, `--ease-standard` (`cubic-bezier(0.4, 0, 0.2, 1)`) as the default. Durations: `--duration-fast` 120ms (hover/press), `--duration-base` 200ms, `--duration-slow` 360ms (route/step transitions). `src/lib/utils/motion.ts` mirrors these as numbers for Framer Motion. All respect `prefers-reduced-motion` — CSS transitions/animations globally via `globals.css`, and Framer Motion loops individually via `useReducedMotion()`.

## Component inventory (`src/components/ui/`)

| Component                                   | Purpose                                                                                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                                    | The only pill shape. Variants `primary` (green), `dark`, `secondary`, `ghost`; sizes `sm`/`md`/`lg`/`icon`; `loading` state.                                              |
| `Card`                                      | The primary surface unit. `interactive` adds the hover lift; `padding` is `sm`/`md`/`lg`.                                                                                 |
| `Badge`                                     | Small colored label — a `StageTone` or `success`/`warning`/`danger`/`neutral`.                                                                                            |
| `Avatar`                                    | Initials only (no photo uploads). Always the `stage-learn` (blue) tint — never a random per-person color, and never a color tied to journey stage.                        |
| `StatPill`                                  | Neutral bordered chip for top-bar stats (icon + value + label). Not a `Badge` — carries no color meaning.                                                                 |
| `SegmentedProgress`                         | Discrete fill chunks, each with its own `StageTone`. Drives onboarding's 3-step bar and the Workbench's 10-session bar.                                                   |
| `TintedPanel`                               | A `StageTone`-washed section wrapper. Holds `Card`s; never another `TintedPanel`.                                                                                         |
| `SelectableCard`                            | Brilliant's dramatic-contrast picker: selected = scaled up + `tint-mint` + `border-green` + shadow; unselected = flat, desaturated, shrunk.                               |
| `Skeleton` / `SkeletonCard` / `SkeletonRow` | Shaped loading placeholders — never a bare grey rectangle standing in for a whole screen.                                                                                 |
| `loaders/RouteTransitionLoader`             | The eleven session dots, chasing in real stage-color sequence. Used as a route's `loading.tsx`. `compact` prop for inline embedding.                                      |
| `loaders/AIThinkingLoader`                  | Cycles caller-supplied narration strings (e.g. "Reading your problem statement"). Never a bare spinner.                                                                   |
| `ThemeToggle`                               | Light/dark switch, built on `Button` (`secondary`, `icon`).                                                                                                               |
| `Input`                                     | Labeled text field. Focus ring comes from the global `:focus-visible` rule, not a component-level one.                                                                    |
| `GoogleMark`                                | The standard four-color Google "G" — inline SVG, since no brand logos live in lucide.                                                                                     |
| `LinkButton`                                | A pill that navigates (`next/link`) instead of clicking a handler — shares `Button`'s exact classes via the exported `buttonClasses()` so the two are visually identical. |

`src/lib/utils/stage.ts` is the single place that maps a `Stage` to its Tailwind classes and label — every stage-colored component reads through it rather than hardcoding a color name.

Screen-specific composites live in `src/components/features/<area>/` and `src/components/landing/` and `src/components/onboarding/` — see `docs/PIPELINE.md`'s phase-by-phase notes for what each one does.
