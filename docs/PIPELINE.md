# Pipeline

How Bootcamp AI's frontend is actually built, in order. This is written as it happens — each phase's section is filled in when that phase ships, not before.

## Phase order and dependencies

1. **Foundation** — project scaffold, TypeScript strict, Tailwind wired to `src/styles/tokens.css`, fonts, lint/format tooling, folder structure, route groups, docs started. Nothing later can start without this.
2. **Design system** — every UI primitive, reviewable at `/design`. Depends on Phase 1's tokens.
3. **Data layer and shell** — domain types, fixtures, `lib/data/` accessors, the sidebar shell, routing. Depends on Phase 2's primitives for the shell's own UI (nav items, badges, avatar).
4. **Auth and onboarding** — depends on Phase 2 (primitives) and Phase 3 (data accessors for venture/role fixtures).
5. **Workbench** — depends on Phase 3 (data, shell) and Phase 2 (primitives).
6. **Remaining screens** — Dashboard, Chat, Knowledge, Team, Profile. Depends on everything above.
7. **Polish and audit** — motion pass, empty/error states, celebration moment, self-audit, docs finalized.

## Phase 1 — Foundation (this phase)

What was built:

- `create-next-app` scaffold: Next.js (App Router), TypeScript strict mode, Tailwind v4, ESLint.
- `src/styles/tokens.css` — every raw design token (see `docs/DESIGN-SYSTEM.md`).
- `src/app/globals.css` — Tailwind theme mapping (`@theme inline`), base layer (focus rings, selection color, reduced-motion), manual dark-mode variant.
- Outfit + Inter wired via `next/font/google` in `src/app/layout.tsx`, exposed as `font-display` / `font-sans`.
- `ThemeProvider` (`src/components/theme-provider.tsx`) — React-state dark mode, no persistence (see D-008).
- Folder structure: `components/{ui,layout,features,onboarding,landing}`, `lib/{data,types,utils}`, `styles/`.
- Two route groups: `(public)` (landing, auth, onboarding — no shell) and `(app)` (signed-in screens — shell arrives Phase 3).
- `/design` route showing every token (colors, stage tints, type scale, radius, elevation) with a live light/dark toggle.
- Prettier + `prettier-plugin-tailwindcss` + `eslint-config-prettier`.

### Running it locally

```bash
npm install
npm run dev       # http://localhost:3000
```

- `/` — the public Dashboard (placeholder text until Phase 6).
- `/design` — the token showcase (expands into the full component kit in Phase 2).

### Other scripts

```bash
npm run lint          # ESLint
npm run format         # Prettier, writes
npm run format:check   # Prettier, check only
npm run typecheck      # tsc --noEmit
npm run build           # production build
```

## Extending the project

### Adding a new session

Sessions are domain data (Phase 3 introduces `Session` in `src/lib/types/` and fixtures in `src/lib/data/`). Adding one means: add a fixture entry with its number, title, stage, and the artifact it produces, then it appears automatically in the Workbench's session journey and progress bar — no component changes needed as long as it fits the existing `Session` shape.

### Adding a new tool

Tools live in the sidebar's "Tools" group and the Workbench's tool grid, both driven by fixture data once Phase 3 lands. A new tool is a fixture entry (title, description, icon, target route) plus the screen it links to under `(app)/tools/<slug>/page.tsx`.

### Connecting a real backend

Every screen reads through `src/lib/data/*.ts` functions. The seam is exactly there: replace a function's body (currently `await` + a fixture + simulated delay) with a real fetch/query. Nothing in `components/` or `app/` needs to change, because they only ever call these functions, never import fixtures directly (see D-010).

---

## Phase 2 — Design system

Every primitive in `src/components/ui/`: `Button`, `Card`, `Badge`, `Avatar`, `StatPill`, `SegmentedProgress`, `TintedPanel`, `SelectableCard`, `Skeleton`/`SkeletonCard`/`SkeletonRow`, and the two loaders (`RouteTransitionLoader`, `AIThinkingLoader`). All shown at `/design`, in light and dark. `src/lib/utils/stage.ts` centralizes stage-color styling; `src/lib/utils/motion.ts` mirrors the motion tokens for Framer Motion. See `docs/DESIGN-SYSTEM.md` for the full inventory.

Mid-phase, the palette and typography were replaced wholesale per new instructions (Instrument Serif + Inter, a new color system) — see D-015. Everything in this phase's component list was built against tokens, so the swap only touched `tokens.css`, `globals.css`, and the handful of components referencing a raw color name directly.

## Phase 3 — Data layer and shell

- **Types** (`src/lib/types/`): `Stage` (its own file, since multiple non-UI things depend on it), and `domain.ts` for `Session`, `Member`, `Team`, `Venture`, `Artifact`, `Message`, `Tool`, `Chapter`, `Contribution`, `Profile`.
- **Fixtures** (`src/lib/data/fixtures/`): real content from the Reference A screenshots (D-016) — Team Helios, Sparkpath, the five tools, six Knowledge chapters — plus the brief's official 10-session curriculum table.
- **Accessors** (`src/lib/data/*.ts`, no subfolder): `getSessions`/`getNumberedSessions`/`getSession`/`getCurrentSession`, `getVenture`, `getTeam`/`getCurrentMember`, `getTools`/`getTool`, `getChapters`, `getRecentArtifacts`/`getArtifacts`, `getContributions`, `getProfile`, `getInitialMessages`/`getAssistantReply`. Every one wraps its fixture in `delay()` (`src/lib/data/delay.ts`).
- **Shell** (`src/components/layout/`): `Shell` (server component, fetches tools + current member once) composes `Sidebar` (desktop, ≥ md) and `MobileNav` (drawer, < md — D-018) from the shared `SidebarNav`, plus `TopBar` (the two stat pills). Wired into `src/app/(app)/layout.tsx`; `src/app/(app)/loading.tsx` renders `RouteTransitionLoader` for real route-level Suspense during navigation.
- **Routes**: `/workbench`, `/chat`, `/tools/[slug]` (one generic template, D-019), `/knowledge`, `/team`, `/profile` all resolve under the `(app)` group. Workbench/Chat/Knowledge/Team/Profile are placeholder text until Phases 5-6; the tool route is real.

---

## Phase 4 — Auth and onboarding

- **Auth** (`src/components/features/auth/auth-form.tsx`): one component, `mode="sign-in" | "sign-up"`, used by `/sign-in` and `/sign-up`. No backend — any submit (Google button or the form) navigates to the mode's destination (`/workbench` or `/onboarding`).
- **Onboarding** (`src/components/onboarding/`): `OnboardingFlow` is the client orchestrator (step state, segmented progress, back/continue, slide transitions via Framer Motion). `RoleStep`, `VentureStep`, `PlanStep` are the three step bodies; `PeekCards` is the fanned preview (D-020). `/onboarding` (server) fetches the venture defaults and the 10 numbered sessions and passes them down — the flow itself never touches `lib/data` directly.
- New primitives added to support this: `Input` (`components/ui/input.tsx`) and `GoogleMark` (`components/ui/google-mark.tsx`, an inline SVG — no brand logo exists in lucide).

---

## Phase 5 — Workbench

`src/components/features/workbench/`: `VentureCard`, `ContinueCard` (the hero — wrapped in `TintedPanel` toned to the current session's stage), `SessionJourney` + `SessionCard` (the 10-session horizontal track, three visual states), `ToolGrid`, `RecentArtifacts`, `TeamStrip`. `/workbench` (server) fetches everything in parallel and composes them in the brief's block order. Two new shared primitives: `LinkButton` (a pill that navigates, sharing `Button`'s exact class-building logic via the exported `buttonClasses()`) and `formatRelativeDate` (`lib/utils/format.ts`).

---

## Phase 6 — Remaining screens

- **Dashboard** (`src/components/landing/`): `FloatingNav`, `Hero` + `HeroIllustration` (flat geometric stage cascade), `FeatureCards`, `JourneySection`, `StructureSection`, `ClosingCta`, `SiteFooter`. `/` (public, no shell) composes them and fetches the 10 numbered sessions for the journey preview.
- **Chat** (`src/components/features/chat/`): `VentureBanner`, `MessageBubble`, `ChatThread` (client — owns message state, the send/reply cycle via `getAssistantReply()`, and the reset control). `src/lib/utils/markdown-lite.tsx` renders `**bold**` and paragraph breaks — the fix for the brief's literal `**Sparkpath**` bug — without pulling in a full markdown library.
- **Knowledge** (`src/components/features/knowledge/`): `ChapterCard` grid from `getChapters()`.
- **Team** (`src/components/features/team/`): `MissionCard`, `MemberCard`, `ContributionHeatmap` (fully literal per-stage/per-intensity classes — see D-022).
- **Profile** (`src/components/features/profile/`): `ProfileHeader`, `StatTile` (the one place besides the hero that uses the serif for a genuinely large number), `ContributionRows`.
- Two real bugs surfaced during this phase's visual verification and were fixed — see D-022 (a dynamically-concatenated Tailwind class silently doing nothing) and D-023 (a flex layout missing `min-w-0`, causing real horizontal overflow at 375px that a screenshot alone wouldn't reveal without measuring `scrollWidth`).

---

## Phase 7 — Polish and audit

- **Celebration moment**: `CelebrationModal` (`src/components/features/chat/celebration-modal.tsx`), triggered by an "Approve session" button in Chat's header — the human approval gate from the product thesis, made concrete. One composed beat (a check-circle in the current session's own stage color, the session title, the artifact committed), not confetti.
- **Empty and error states**: `RecentArtifacts` has a designed empty state. `src/app/not-found.tsx` and `src/app/error.tsx` (a real client error boundary) replace Next.js's defaults, styled to match the rest of the app.
- **Motion pass**: audited every `framer-motion` usage for `prefers-reduced-motion` compliance and found it was incomplete (3 of 6 components) — see D-021 through D-024, especially D-024, which is a real hydration-mismatch bug (not just a missed feature) that only Playwright's `reducedMotion: 'reduce'` browser context surfaced. `src/lib/utils/use-safe-reduced-motion.ts` is now the one way any component reads that preference.
- **Responsive audit**: screenshotted every route at 375px, 768px and 1440px, and — critically — checked `document.documentElement.scrollWidth` against the viewport width programmatically rather than trusting screenshots alone, since a screenshot can look fine while the page is technically wider than the viewport. This caught D-023 (a `min-w-0` flexbox gap) and D-025 (two `sm:` breakpoints that broke specifically at 768px because of the sidebar's width, invisible at 375px or 1440px).
- **A Tailwind-specific class of bug** (D-022): a dynamically-concatenated class string (`` `${stage.bg}/25` ``) is invisible to Tailwind's build-time scanner — no build error, no lint error, just silently inert CSS. Caught only by actually exercising the varying states (the Team heatmap's differing intensities) and looking, not by any automated check.

### Self-audit

| Check                                                                  | Status                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nothing visual copied from the prototype; it informed layout/copy only | ✅ — Reference A (arrived mid-Phase 2, D-015/D-016) used only for sidebar grouping, block order, and real screen copy (tools, team, chapters, venture). All color/type/component styling is Brilliant-derived, on our own token system.                                                                                                                                                    |
| No saturated gradient blocks                                           | ✅ — `grep -rn "gradient"` across `src/` returns nothing.                                                                                                                                                                                                                                                                                                                                  |
| Stage colors are restrained accents, never large fills                 | ✅ — largest stage-color usage is the `size-11` icon badges in `HeroIllustration`/tool grids and the 7% `color-mix()` tinted panels; never a full-bleed fill.                                                                                                                                                                                                                              |
| Exactly one signed-in home (Workbench), no duplicate dashboard         | ✅ — D-001.                                                                                                                                                                                                                                                                                                                                                                                |
| Zero hardcoded colors outside `tokens.css`                             | ✅ with one documented exception — `GoogleMark`'s four hex values are Google's own official brand mark colors, not app design tokens; tokenizing a third party's logo into our palette would be the wrong move, not the right one.                                                                                                                                                         |
| Zero arbitrary spacing/font-size values                                | ✅ — every `text-*` is a scale step (D-005); spacing uses Tailwind's default multiplier scale throughout. The few `[...]` bracket usages that exist are a `transition-property` list, a `scale()` micro-interaction value, a CSS `grid-template-columns` track list, and Framer Motion keyframe/bezier arrays — none are spacing or font-size escapes.                                     |
| No `any`, no `@ts-ignore`/`@ts-nocheck`                                | ✅ — grepped, zero matches. `npx tsc --noEmit` passes clean.                                                                                                                                                                                                                                                                                                                               |
| Every interactive element keyboard-reachable with a visible focus ring | ✅ — everything interactive is a real `<button>`/`<a>`/`<input>`; one global `:focus-visible` rule in `globals.css` (never suppressed) covers all of them.                                                                                                                                                                                                                                 |
| Color contrast meets WCAG AA, checked not assumed                      | ✅ for the pairing that mattered most — white-on-`--green` was computed at ≈2.5:1 (fails) and corrected to dark ink at ≈7.5:1 (D-015). Stage-color icon fills (`text-on-accent` on blue/purple/gold/green) were spot-checked by the same relative-luminance formula and dark ink wins contrast in every case, not just green's.                                                            |
| Every list/data view has a loading and empty state                     | ✅ for what can realistically be empty — `RecentArtifacts` has a designed empty state; the route-level `loading.tsx` (`RouteTransitionLoader`) covers every signed-in navigation. Sessions, tools, chapters and team members are fixed non-empty curriculum/roster data with no delete path in this frontend-only build, so an "empty" state for them isn't a real scenario to design for. |
| No emoji standing in for icons                                         | ✅ — grepped for the emoji Unicode ranges across `src/`, zero matches; every icon is `lucide-react` or `GoogleMark`.                                                                                                                                                                                                                                                                       |
| No `console.log`/commented-out code                                    | ✅ — grepped; the only `console.*` call is `console.error` in the error boundary, which is correct there.                                                                                                                                                                                                                                                                                  |
| No component over ~200 lines                                           | ✅ — longest is 179 lines (`/design`'s token showcase); everything else is well under.                                                                                                                                                                                                                                                                                                     |
| No placeholder/lorem copy                                              | ✅ — every string is either the brief's own copy, Reference A's real content, or written in-register for this product.                                                                                                                                                                                                                                                                     |
| Works at 375px, 768px and 1440px                                       | ✅ — see the responsive audit above; two real bugs found and fixed (D-023, D-025), verified via `scrollWidth` measurement, not just visual spot-checks.                                                                                                                                                                                                                                    |
| `prefers-reduced-motion` honored everywhere                            | ✅ — see the motion pass above; one real hydration bug found and fixed (D-024).                                                                                                                                                                                                                                                                                                            |
| Lint and build pass clean                                              | ✅ — `npm run build`, `npm run lint`, `npx tsc --noEmit` all clean as of this phase.                                                                                                                                                                                                                                                                                                       |
| Naming consistent, no `Card2`/`NewButton`/`index2`                     | ✅.                                                                                                                                                                                                                                                                                                                                                                                        |
| Nothing reaches for a backend                                          | ✅ — no `fetch()` to any URL anywhere in the app; the only network activity is Next.js's own dev/build tooling and Google Fonts at build time via `next/font`.                                                                                                                                                                                                                             |
