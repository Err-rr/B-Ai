"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Session } from "@/lib/types/domain";
import { STAGE_CLASSES } from "@/lib/utils/stage";
import { useSafeReducedMotion } from "@/lib/utils/use-safe-reduced-motion";

type TrackItem =
  | { kind: "session"; key: string; session: Session }
  | { kind: "loop"; key: string };

function SessionTile({ session }: { session: Session }) {
  return (
    <div className="flex w-32 shrink-0 flex-col gap-2 rounded-lg p-3">
      <span
        className={`size-2 rounded-full ${STAGE_CLASSES[session.stage].bg}`}
      />
      <span className="text-ink-3 text-xs">Session {session.number}</span>
      <span className="text-ink line-clamp-2 text-xs font-medium">
        {session.title}
      </span>
    </div>
  );
}

/**
 * Marks where the loop wraps back to Session 1 - same box footprint
 * as a session tile (w-32, p-3) so the gap either side of it exactly
 * matches the gap between any other two tiles, keeping it centered
 * between "Session 10" and "Session 1" rather than drifting toward one.
 */
function LoopMarker() {
  return (
    <div className="flex w-32 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg p-3">
      <Star
        className="text-stage-build size-6"
        fill="currentColor"
        aria-hidden="true"
      />
      <span className="text-ink-3 text-eyebrow font-semibold uppercase">
        Loop
      </span>
    </div>
  );
}

function buildTrack(sessions: Session[], repeat: boolean): TrackItem[] {
  const block: TrackItem[] = [
    ...sessions.map((session) => ({
      kind: "session" as const,
      key: session.id,
      session,
    })),
    { kind: "loop" as const, key: "loop" },
  ];
  if (!repeat) return block;
  return [
    ...block.map((item) => ({ ...item, key: `a-${item.key}` })),
    ...block.map((item) => ({ ...item, key: `b-${item.key}` })),
  ];
}

/**
 * A static box whose inner track auto-scrolls in a seamless loop, a
 * solid star marking where Session 10 rolls back into Session 1 - no
 * scrollbar, not user-draggable. Pauses entirely under
 * prefers-reduced-motion (shown once, unlooped, with the same marker).
 */
export function SessionMarquee({ sessions }: { sessions: Session[] }) {
  const reduceMotion = useSafeReducedMotion();
  const track = buildTrack(sessions, !reduceMotion);

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max items-center gap-3"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: sessions.length * 3,
                ease: "linear",
                repeat: Infinity,
              }
        }
      >
        {track.map((item) =>
          item.kind === "loop" ? (
            <LoopMarker key={item.key} />
          ) : (
            <SessionTile key={item.key} session={item.session} />
          ),
        )}
      </motion.div>
    </div>
  );
}
