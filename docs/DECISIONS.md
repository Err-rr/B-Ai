# Decisions

A running log of non-obvious choices. Newest entries at the bottom.

## D-001: "Dashboard" is the public landing page; "Workbench" is the only signed-in home

**Date:** 2026-09-17
**Context:** The brief flags this naming as easy to get wrong. "Dashboard" sounds like a signed-in analytics screen in most products.
**Decision:** `/` (inside the `(public)` route group) is the Dashboard — the marketing page a visitor sees before signing in. The Workbench, at a signed-in route, is the single home after onboarding and carries all progress, venture context, the session journey and the tool grid.
**Reasoning:** Matches the brief's explicit instruction and prevents the natural drift toward building a second, signed-in "dashboard" later.
**Alternatives rejected:** A signed-in `/dashboard` route — rejected outright, the brief is explicit that this would be a duplicate home.
**Consequences:** Anyone extending the app should add signed-in views to the Workbench or a new tool, never a new top-level "dashboard".

## D-002: Proceeding without Reference A (prototype) screenshots

**Date:** 2026-09-17
**Context:** The brief describes two screenshot sets: the Bootcamp AI prototype (layout only) and Brilliant.org (all visual design). Only the Brilliant.org screenshots were actually attached to the conversation. No prototype screenshots arrived.
**Decision:** Build from the brief's section 7 text (the layout skeleton, written out block-by-block per page) and section 8 (verbatim landing copy) in place of the missing prototype images. Brilliant.org screenshots are used exactly as instructed, for all visual and interaction decisions.
**Reasoning:** Section 7 and 8 are detailed enough to fully specify sidebar grouping, block order, and copy without ambiguity — the prototype images would only have added pixel-level confirmation of a wireframe, which the brief explicitly says carries no visual information anyway.
**Alternatives rejected:** Pausing the build to wait for the images — rejected because the text spec is unambiguous and stopping would block Phase 1 for no material gain to layout fidelity.
**Consequences:** If prototype screenshots surface later, only layout ordering/grouping would need a second pass — never colors, type, or component styling, since those were never meant to come from that reference.

## D-003: Package manager — npm

**Date:** 2026-09-17
**Context:** No preference stated; needed to scaffold immediately.
**Decision:** npm, the runtime's built-in package manager.
**Reasoning:** Zero extra setup, most portable across contributors' machines.
**Alternatives rejected:** pnpm/yarn — no evidence either is installed or preferred.
**Consequences:** `package-lock.json` is the lockfile of record. Switching later just means regenerating the lockfile.

## D-004: Tailwind v4, CSS-first tokens, no `tailwind.config.js`

**Date:** 2026-09-17
**Context:** `create-next-app` scaffolded Tailwind v4, whose idiomatic configuration is CSS-based (`@theme`) rather than a JS config file.
**Decision:** `src/styles/tokens.css` holds every raw design token as a plain CSS custom property (colors, radii, shadows, motion). `src/app/globals.css` imports it and maps each token into Tailwind's theme via a single `@theme inline` block, so tokens become ordinary utilities (`bg-mist`, `text-ink`, `rounded-lg`, `shadow-soft`, …).
**Reasoning:** Keeps the brief's "one tokens file" rule literally true, and CSS custom properties mean the same token can be read by both Tailwind utilities and any hand-written CSS or inline style without duplication. It also makes dark mode a matter of overriding custom properties under `:root.dark`, rather than maintaining two Tailwind themes.
**Alternatives rejected:** A JS `tailwind.config.js` theme object — fights the grain of Tailwind v4 and would need to duplicate values already expressed as CSS variables for dark mode.
**Consequences:** Anyone adding a token edits exactly one file (`tokens.css`) and, if it needs a utility class, adds one line to the `@theme inline` block in `globals.css`.

## D-005: Type scale rides Tailwind's numeric `text-*` keys, fully overridden

**Date:** 2026-09-17
**Context:** The brief asks for "a real type scale with named steps" and zero arbitrary font sizes.
**Decision:** Every default Tailwind font-size key (`text-xs` … `text-9xl`) is redefined in `@theme inline` to one of our ten steps (caption → display XL), each paired with its own line-height and letter-spacing. `text-8xl`/`text-9xl` are capped at the same value as `text-7xl` (display XL) so no accidental step exists above it. One additional custom key, `text-eyebrow`, covers the uppercase small-caps label role Brilliant uses, which doesn't fit the body/heading/display ladder.
**Reasoning:** Reusing Tailwind's native scale keeps class names idiomatic (`text-3xl`, not `text-heading-lg`) while still making every size traceable to one named step — the mapping is documented in `docs/DESIGN-SYSTEM.md`. It also means there is no second, parallel set of size utilities for someone to reach for by mistake.
**Alternatives rejected:** Inventing a fully custom named scale (`text-display-xl`, `text-heading-md`, …) — considered clearer at first glance, but it leaves Tailwind's default numeric scale sitting unused-but-present, which is exactly the "arbitrary size" escape hatch the brief wants closed.
**Consequences:** Reviewing "is this on-scale?" is just "is it a `text-*` utility?" — the answer is always yes by construction.

## D-006: Outfit substitutes for Brilliant's display serif via size and weight, not imitation

**Date:** 2026-09-17
**Context:** Brilliant's largest headlines use a serif; the brief mandates Outfit (geometric sans) instead.
**Decision:** Display steps (`text-4xl`–`text-7xl`) are set at semibold/bold weight with tight leading (1.0–1.12) and increasingly negative letter-spacing (-0.012em to -0.02em) to give Outfit comparable visual weight to a large serif headline, rather than trying to soften Outfit into serif-like proportions.
**Reasoning:** This is the brief's own instruction (section 6): lean into the geometry rather than fight it.
**Alternatives rejected:** Loosening tracking/leading to feel more "editorial" like a serif — rejected, produces a weaker, more generic headline than a confident tight-set geometric sans.
**Consequences:** Headline copy should stay short — tight leading and negative tracking read poorly on long wrapped lines.

## D-007: Stage tints computed with `color-mix()`, not hardcoded per-theme hex values

**Date:** 2026-09-17
**Context:** Tinted panels need a ~6–8% wash of a stage color, in both light and dark mode, for four stage colors — sixteen values if hardcoded.
**Decision:** Each tint is `color-mix(in srgb, var(--stage-x) 7%, var(--tint-mix-base))`, where `--tint-mix-base` is white in light mode and the dark card surface color in dark mode.
**Reasoning:** One formula instead of sixteen hand-picked hex values, and it can't drift out of sync with the base stage color if that's ever adjusted.
**Alternatives rejected:** Precomputed hex tints per theme — more values to maintain, easy to get inconsistent across the four stages.
**Consequences:** Requires a browser with `color-mix()` support (all evergreen browsers; Safari 16.2+). Given the audience (schools, modern Chromebooks/laptops), this is an acceptable floor.

## D-008: Dark mode is a class toggle driven by React state, not persisted

**Date:** 2026-09-17
**Context:** The brief requires a real theme toggle in the sidebar, but also forbids `localStorage` in this phase.
**Decision:** `ThemeProvider` (`src/components/theme-provider.tsx`) holds `theme` in React state, seeds it from `window.matchMedia('(prefers-color-scheme: dark)')` on mount, and toggles a `dark` class on `<html>`. A `@custom-variant dark` rule in `globals.css` makes Tailwind's `dark:` variant key off that class instead of the OS media query.
**Reasoning:** Satisfies "build light and dark properly using CSS custom properties" and "a theme toggle" while honoring the no-persistence constraint literally.
**Alternatives rejected:** OS-media-query-only dark mode (no manual toggle) — doesn't satisfy the brief's explicit sidebar toggle requirement.
**Consequences:** A page refresh forgets a manual override and falls back to the OS preference. This is a known, deliberate trade-off — worth revisiting the moment persistence is allowed (a real backend, or explicit sign-off to use `localStorage`).

## D-009: No component library

**Date:** 2026-09-17
**Context:** Explicit hard constraint in the brief.
**Decision:** All primitives (`Button`, `Card`, `Badge`, `Avatar`, `Progress`, `Pill`, …) are hand-built in `src/components/ui/`, styled directly against the token set.
**Reasoning:** The brief states this is the point of the exercise — a design system tuned exactly to this palette, type scale and interaction language, with no fighting an off-the-shelf library's defaults.
**Alternatives rejected:** shadcn/ui as a scaffold — rejected per explicit instruction, even though it would have been faster to start from.
**Consequences:** More upfront component work; no dependency on a third party's breaking changes or default styling assumptions.

## D-010: Mock data boundary — `lib/data/*` functions, never fixtures, imported by components

**Date:** 2026-09-17
**Context:** Hard constraint: no backend, but the app must be trivial to wire to a real one later.
**Decision:** Every screen reads through async functions in `src/lib/data/` (e.g. `getTeam()`, `getSessions()`, `getMessages()`) that internally read fixture data and simulate latency. Components import only these functions, never a fixture file directly. Implemented in Phase 3.
**Reasoning:** When a real backend exists, only the bodies of these functions change (fixture read → API call); call sites and component code are untouched.
**Alternatives rejected:** A mock server (e.g. MSW) — more machinery than the brief asks for; "fixtures plus async functions is the whole approach" per the brief.
**Consequences:** Any new screen must add a `lib/data` accessor before it can read data — this is the one seam kept deliberately rigid.

## D-011: Two route groups — `(public)` and `(app)`

**Date:** 2026-09-17
**Context:** Public/auth/onboarding screens have no sidebar; every signed-in screen shares one persistent shell.
**Decision:** `src/app/(public)/` holds the landing page, sign-in/up, and onboarding, with a pass-through layout. `src/app/(app)/` holds Workbench, Chat, Tools, Knowledge, Team, Profile, wrapped by the sidebar shell (built in Phase 3).
**Reasoning:** Route groups don't affect the URL, so `/` stays the Dashboard while cleanly separating which pages get the shell.
**Alternatives rejected:** A single flat `app/` tree with a conditional shell in the root layout keyed off pathname — messier, and loses the compile-time clarity of "this page is inside the shell" vs. not.
**Consequences:** New signed-in screens go under `(app)/`; new public-facing screens go under `(public)/`.

## D-012: `cn()` utility added in Phase 1

**Date:** 2026-09-17
**Context:** Every styled component will need to merge conditional classes and resolve Tailwind conflicts (e.g. a passed-in `className` overriding a default).
**Decision:** `src/lib/utils/cn.ts` wraps `clsx` + `tailwind-merge`, installed now rather than deferred.
**Reasoning:** This is real, load-bearing infrastructure the very first primitive in Phase 2 needs — not a speculative abstraction.
**Alternatives rejected:** Deferring to Phase 2 — would just mean writing this same file on the first line of Phase 2 work.
**Consequences:** None; this is the standard shape for this utility across the ecosystem.

## D-013: Version control not initialized yet

**Date:** 2026-09-17
**Context:** The working directory had no git repository. Organization workflow (branch model: `development` → `staging` → `main`, PRs, release labels) assumes an existing YFS GitHub remote to clone and branch from.
**Decision:** Defer `git init` / repo setup until there's an actual YFS GitHub repository to work against, rather than creating a disconnected local-only repo now.
**Reasoning:** Initializing git in isolation would need to be reconciled with the real remote's history later anyway, and the org workflow explicitly starts from `git clone -b development <url>`, not a fresh local repo.
**Alternatives rejected:** `git init` now with no remote — would produce a throwaway history that doesn't match how this project should actually enter the org's branch model.
**Consequences:** No commits exist yet. Once a remote repository is available, the project's existing files should be brought into a `feature/` branch cut from `development` per the standard YFS workflow, not pushed directly.

## D-014: Prettier + `prettier-plugin-tailwindcss` wired alongside ESLint

**Date:** 2026-09-17
**Context:** Brief requires ESLint and Prettier configured and passing.
**Decision:** `eslint-config-prettier` disables stylistic ESLint rules that would conflict with Prettier; `prettier-plugin-tailwindcss` sorts class lists into a canonical order automatically.
**Reasoning:** Removes an entire category of bikeshedding (rule conflicts, class ordering) before any component code exists.
**Alternatives rejected:** None seriously considered — this is a standard, low-risk pairing.
**Consequences:** `npm run format` is the source of truth for formatting; `npm run lint` for correctness/quality rules only.

## D-015: Palette and typography replaced — Reference A screenshots arrived, and a revised token spec

**Date:** 2026-09-17
**Context:** Mid-Phase 2, the user supplied the actual Reference A (prototype) screenshots the brief had originally promised — confirming the sidebar grouping, block order and tool/team/chapter content already assumed from section 7's text — and, separately, an explicit instruction to replace the entire color and type system: Instrument Serif + Inter instead of Outfit + Inter, and a new warm-neutral palette (paper/card/line/track, ink/ink-2/ink-3, a single green primary action color, a near-black "dark" pill for Continue/Get started, and four stage accents — blue/purple/gold/green — replacing the original violet/purple/magenta/coral set).
**Decision:** Rebuilt `tokens.css` and the `globals.css` theme mapping around the new palette exactly as specified, swapped `next/font/google`'s `Outfit` for `Instrument_Serif` (confirmed it ships only a 400 weight — matches the instruction "do not bold the serif" exactly), and narrowed which type-scale steps get the serif: only `text-4xl` and up ("display", i.e. genuine hero-scale headlines and large numbers) use `font-display`, all weight 400, letter-spacing ~0em. `text-xl`/`2xl`/`3xl` ("heading") moved to `font-sans font-semibold` — Inter, not serif, since the new brief line reads "Instrument Serif for display headlines **and large numbers**," not every heading.
**Reasoning:** Because every stage-colored surface in the app already routed through `src/lib/utils/stage.ts`'s `STAGE_CLASSES` (Badge, SegmentedProgress, TintedPanel, the future session journey) rather than hardcoding `bg-violet` etc. at each call site, this rename was mostly contained to `tokens.css` + `globals.css` + the handful of components that referenced a raw brand color directly (Button, Avatar, SelectableCard, Skeleton, the AI-thinking loader's pulse dot). That containment is exactly what D-004's single-tokens-file decision was for.
**Alternatives rejected:** Keeping Outfit and only recoloring — rejected, the instruction was explicit and specific about both axes (serif family, weight-400-only discipline, and which steps qualify as "display").
**Consequences:** `--violet`/`--purple`/`--magenta`/`--coral`/`--mist`/`--surface`/`--on-ink` no longer exist as token names — anything referencing them by memory is stale. The corrected mapping: `--mist` → `--paper`, `--surface` → `--card`, `--on-ink` → `--on-dark`, and the `Button` `ink` variant → `dark`. A new WCAG check landed alongside this: white text on the new `--green` (#00BC5C) fails AA (≈2.5:1) — `--on-accent` is dark ink text instead, verified at ≈7.5:1.

## D-016: Reference A's concrete content (tools, team, chapters, venture) adopted as fixture data

**Date:** 2026-09-17
**Context:** The Reference A screenshots showed real screen copy the brief's section 8 didn't fully specify: five tool names (Idea Pressure-Tester, Customer Interview Coach, Lean Canvas Builder, Pitch Rehearsal, Market-Sizing Helper), a team ("Team Helios": Heera Basnet/CEO, Ravi Kumar/CTO, Mei Tanaka/CMO, Jamal Hussein/CFO), a venture ("Sparkpath — AI mentor that pairs high-school students with deep-tech careers"), and six Knowledge chapter titles (Speedrunning, Working with AI, Ideation, Team Formation, Market & GTM, Financials).
**Decision:** Use this content directly as the Phase 3 fixture data, styled per Brilliant rather than the prototype's visual treatment.
**Reasoning:** The brief forbids placeholder/lorem copy. This is the client's own real content for exactly these screens — reusing it beats inventing parallel fictional names, and it's consistent with section 3's instruction to take landing copy from Reference A (this is the same category of asset for the screens section 8 didn't cover).
**Alternatives rejected:** Writing original placeholder names — rejected, worse fidelity to intent for no benefit.
**Consequences:** Fixture content in `src/lib/data/` should stay traceable to these screenshots; if the real prototype's content changes later, the fixtures are the place to update it.

## D-017: "10 sessions" is scoped to the numbered sessions; "Pre" is separate

**Date:** 2026-09-17
**Context:** The brief's session table lists Pre plus 10 numbered sessions (11 total), but every piece of copy says "10 sessions" (the landing headline, "X of 10 sessions" progress) and Profile shows "4/10 stages complete."
**Decision:** `getNumberedSessions()` (`src/lib/data/sessions.ts`) excludes "Pre" and is the sole source for any "X of 10" figure — the top bar's "sessions complete" stat, the Workbench progress bar (Phase 5), and Profile's stat tile. `getSessions()` (all 11) is used only where Pre needs to visually appear, e.g. the full journey path.
**Reasoning:** Counting Pre toward the "10" would make every "of 10" figure in the app either wrong or inconsistent with the landing headline's own promise.
**Alternatives rejected:** Counting all 11 and changing the copy to "11 sessions" — rejected, contradicts the brief's explicit, repeated "10 sessions" language.
**Consequences:** Fixture data (`SESSIONS`) has 4 of the 10 numbered sessions marked `complete` and "Product Logic & MVP" (5) `current`, so `getNumberedSessions()` naturally yields "4 of 10" everywhere without per-screen arithmetic.

## D-018: Mobile navigation is a slide-in drawer, not a bottom tab bar

**Date:** 2026-09-17
**Context:** The brief allows either "a bottom nav or a drawer" at 375px. The sidebar has 10 destinations (2 workspace + 5 tools + 3 reference) — too many for a comfortable 4-5 item bottom bar without inventing a secondary "more" hierarchy the desktop sidebar doesn't have.
**Decision:** `MobileNav` (`src/components/layout/mobile-nav.tsx`) is a slide-in drawer, reusing the exact same `SidebarNav` component and grouping as desktop, triggered by a hamburger button in a small sticky top bar.
**Reasoning:** Full parity with desktop's information architecture — nothing is hidden or reorganized between breakpoints, and there's one nav component (`SidebarNav`) to maintain instead of two divergent structures.
**Alternatives rejected:** A bottom bar with 4-5 items and a "more" overflow — rejected, it would require deciding which destinations are "important enough," a judgment call the brief doesn't make and one that would fragment the nav model across breakpoints.
**Consequences:** Adding a nav item (e.g. a 6th tool) never requires a mobile-specific decision about what to cut.

## D-019: Tool detail pages are one generic template, not five bespoke flows

**Date:** 2026-09-17
**Context:** The brief names five tools (sidebar/tool grid) but never designs their internal screens — Phase 5's "tool grid" and Phase 7's audit are about the grid entry point, not tool-specific interactive flows, and building five fully bespoke guided experiences (a real "Idea Pressure-Tester" wizard, etc.) is out of scope for a frontend-only pass with no backend to drive them.
**Decision:** `src/app/(app)/tools/[slug]/page.tsx` is one dynamic route rendering the tool's title, description and icon from fixture data, with a short note that the guided flow lives in the real product and that every role can open every tool.
**Reasoning:** Keeps every tool link live (no dead ends from the sidebar or Workbench grid) without fabricating five different interactive product designs the brief never specified.
**Alternatives rejected:** Building one fully bespoke flow (e.g. a real Lean Canvas grid) to "prove it's possible" — rejected as scope creep beyond what any part of the brief asks for; if a future brief specifies a tool's actual interaction design, it gets its own route.
**Consequences:** If the client wants a specific tool's real flow designed later, it replaces this one page for that slug — the routing and data lookup are already in place.

## D-020: Onboarding's peek-card fan lives in a preview zone below the grid, not behind one card

**Date:** 2026-09-17
**Context:** The brief asks to fan 2-3 rotated peek cards "behind the selected card." Brilliant's own reference screenshot does this behind a single focal card in a two-option layout. Our role step has four options side by side in a row, so there's no single card with open space behind it to fan into without overlapping neighboring cards.
**Decision:** `PeekCards` (`src/components/onboarding/peek-cards.tsx`) renders the fanned, rotated preview in a dedicated zone beneath the 4-card grid, keyed to the current selection so it cross-fades when the choice changes.
**Reasoning:** Preserves the actual goal (a rotated, fanned preview of what the choice involves, tied to selection) without fighting a 4-up grid layout that the two-option reference never had to contend with.
**Alternatives rejected:** Absolutely positioning the fan behind whichever grid cell is selected — rejected, it would either get clipped by neighboring cards or require reflowing the grid around whichever item is selected, adding real complexity for a cosmetic detail.
**Consequences:** If a step ever goes back to exactly two options, the literal "fan behind the card" treatment becomes viable again and could replace this.

## D-021: Onboarding and auth headings use `font-sans font-semibold`, not the serif

**Date:** 2026-09-17
**Context:** D-015 reserves `font-display` (Instrument Serif) for `text-4xl` and up. Onboarding/auth headings ("Which role will you own?", "Welcome back") sit at `text-3xl` (Heading LG) by design — prominent, but not hero-scale.
**Decision:** Every onboarding step heading and both auth headings use `text-3xl font-sans font-semibold`.
**Reasoning:** Consistent with the type-scale rule rather than a one-off exception; also matches Brilliant's own onboarding screenshots, where the step question is a bold sans headline, not their marketing-page serif.
**Alternatives rejected:** Using the serif for onboarding questions to feel more "branded" — rejected, breaks the rule the moment it's applied selectively.
**Consequences:** The serif now appears in exactly one place until Phase 6: the landing page hero.

## D-022: Tailwind's scanner can't see a dynamically concatenated class — two real bugs from this

**Date:** 2026-09-17
**Context:** Phase 6's visual verification caught two real bugs, both the same root cause: a class string built at runtime via template literal (e.g. `` `${stage.bg}/25` ``) never appears as literal text anywhere in the source, so Tailwind's build-time scanner never generates the CSS for it — the class is silently inert, not an error.

1. The Team contribution heatmap (`contribution-heatmap.tsx`) computed `` `${stage.bg}${opacitySuffix}` `` for intensity 1/2 cells. Every non-zero cell rendered at full solid color instead of a tint, because `bg-stage-learn-to-build/25` never existed as a literal string for the scanner to find.
2. Unrelated to this pattern but caught in the same pass: `HeroIllustration`'s cascading rows used `translate-x-[4.5rem]` (a real, scanned class — this one wasn't a Tailwind bug) to fan out diagonally, which visually bled past the card at 375px since `transform` doesn't affect layout width and the card had no `overflow-hidden`. Caught by measuring `document.documentElement.scrollWidth` (390 vs. the 375 viewport) with Playwright — not something a build/lint pass or a static screenshot would show.
   **Decision:** For (1), `contribution-heatmap.tsx` now has a fully literal `Record<Stage, Record<1|2|3, string>>` spelling out every class name — no concatenation. For (2), the offsets were reduced to a safer max (`translate-x-9` instead of `translate-x-[4.5rem]`) and the card gained `overflow-hidden` as a defensive floor.
   **Reasoning:** The fix for (1) generalizes: any time a stage/intensity/variant combination needs its own opacity or shade, it must be authored as a complete literal string, never assembled from parts, or the scanner won't find it.
   **Alternatives rejected:** A Tailwind `safelist` entry for the concatenated pattern — rejected, it would have worked but hides the actual list of "real" classes in a config file instead of at the call site, and doesn't stop the next occurrence of the same mistake.
   **Consequences:** Added to the Phase 7 audit: grep for template-literal class construction (`` `${...}` `` next to `bg-`/`text-`/`border-`) as a recurring check, since this class of bug produces no build error, no lint error, and no visual difference in a _static_ screenshot at the default/first-rendered state — it only shows up when the varying states are actually exercised and compared.

## D-023: Every flex child in the app shell needs `min-w-0`

**Date:** 2026-09-17
**Context:** At 375px, `/workbench` (and every signed-in route) rendered at 390px wide with a real horizontal scrollbar. The Workbench's session journey (`overflow-x-auto` with ten `shrink-0` cards) was the visible symptom, but the actual cause was upstream: `Shell`'s content column (`flex flex-1 flex-col`) and its `<main>` had no `min-w-0`, so the flex layout algorithm let them grow to fit their widest descendant's intrinsic content width instead of clamping to the available space — the classic flexbox "min-width: auto" default.
**Decision:** Added `min-w-0` to `Shell`'s content column and to `<main>` (`src/components/layout/shell.tsx`).
**Reasoning:** This is the standard fix for exactly this failure mode, and it belongs at the shell level once, rather than on every individual `overflow-x-auto` row scattered across Workbench, Team, and the landing page.
**Alternatives rejected:** Adding `min-w-0` only to `SessionJourney`'s own wrapper — would have fixed that one instance but left the same trap for the next horizontally-scrolling row anyone adds inside the shell.
**Consequences:** Verified via `document.documentElement.scrollWidth === innerWidth` across every signed-in route at 375px, not just visual inspection (a screenshot alone doesn't distinguish "375px, no scrollbar" from "390px, all content visible because nothing this wide happened to render off-screen at that particular scroll position").

## D-024: `prefers-reduced-motion` reads go through a hand-rolled `useSyncExternalStore` hook, not Framer Motion's `useReducedMotion()`

**Date:** 2026-09-17
**Context:** After wiring `useReducedMotion()` into the onboarding transition, the mobile drawer, the two loaders and the celebration modal (all six places Framer Motion drives an animation), testing with Playwright's `reducedMotion: 'reduce'` browser context — simulating a user who already has the OS accessibility preference on before the page ever loads — produced a real React hydration-mismatch error on `/onboarding`: the server rendered the step transition's "motion enabled" `initial` style (`opacity: 0, transform: translateX(24px)`), the client's very first paint rendered the "reduced" style (`opacity: 0` only) instead, and React logged the mismatch. Framer Motion's `useReducedMotion()` reads `matchMedia` synchronously on the client but returns `null` server-side with no SSR-safe reconciliation step — the opposite of the pattern `ThemeProvider` already used correctly for its own OS-preference read (see D-008).
**Decision:** `src/lib/utils/use-safe-reduced-motion.ts` reads the media query via `useSyncExternalStore`, with `getServerSnapshot` hardcoded to `false` so the server and the client's first render always agree; React reconciles to the real value immediately after mount. All six components now import `useSafeReducedMotion` from this file instead of `useReducedMotion` from `framer-motion`.
**Reasoning:** This is the same fix as D-008, applied to a second OS-preference read discovered later — `useSyncExternalStore` is the React-sanctioned way to subscribe to external, possibly-SSR-unavailable state without a mismatch, and it also sidesteps the `react-hooks/set-state-in-effect` lint error a naive `useEffect` + `setState` version hit (the first attempt at this fix).
**Alternatives rejected:** A `useEffect`-deferred `useState` wrapper around Framer Motion's hook — worked functionally but tripped the same lint rule D-008 already worked around once; no reason to reintroduce it. Suppressing the lint rule inline — rejected, the rule was correctly flagging a real anti-pattern, not a false positive.
**Consequences:** This is exactly the class of bug the brief's audit line "checked rather than assumed" exists for — it produces no build error, no lint error, and is invisible in a screenshot taken with default browser settings. Any future component that reads an OS-level media-query preference (motion, color scheme, contrast) should use this same `useSyncExternalStore` pattern, not a hook that only reads client-side.

## D-025: 768px specifically — the sidebar makes "tablet width" narrower than it looks

**Date:** 2026-09-17
**Context:** The self-audit's "works at 375px, 768px and 1440px" line is easy to satisfy for the outer two and skip for the middle one, on the assumption that if 375px stacks correctly and 1440px sits comfortably in a row, 768px is "probably fine." It wasn't. Two `sm:flex-row` (640px breakpoint) layouts — `ContinueCard` (title + button) and `ProfileHeader`'s email/school row — broke specifically at 768px: `ContinueCard`'s title wrapped one word per line squeezed against the button, and `ProfileHeader`'s school line ran past the tinted panel's edge. Neither was visible at 375px (still stacked, `flex-col`) or at 1440px (plenty of room past 640px). The actual cause: inside the signed-in shell, the 288px sidebar eats into the viewport, so content-area width at a 768px _viewport_ is closer to what a ~480px viewport would give a full-width page — well past the `sm:` breakpoint's assumption but not past `lg:`.
**Decision:** `ContinueCard` moved its row breakpoint to `lg:` and gave the text block `min-w-0 flex-1` (so if it's ever tight again, text wraps normally instead of getting squeezed to near-zero width) and the button `shrink-0`. `ProfileHeader`'s email/school row gained `flex-wrap` so an item drops to its own line instead of overflowing when the row is too narrow for both.
**Reasoning:** For any two-item row living inside the sidebar shell, a fixed `sm:`/`md:` breakpoint is measuring the wrong thing — the true constraint is available _content_ width, which flex-wrap and flex-1/shrink-0 handle correctly regardless of exactly how wide the sidebar is, rather than guessing a breakpoint number that happens to work today.
**Alternatives rejected:** Tuning the exact breakpoint number for each instance — fragile, and the next component with this shape would hit the same trap.
**Consequences:** General rule going forward: any `flex-row` pairing text with a fixed-width sibling (a button, an icon) inside the signed-in shell needs `min-w-0`/`flex-1` on the text and either a wider breakpoint or `flex-wrap`, not just `sm:`. Confirmed by screenshotting every signed-in route plus the landing/auth pages at exactly 768px, not inferring "middle should be fine" from the other two sizes.
