import { BookOpen } from "lucide-react";
import type { Chapter } from "@/lib/types/domain";
import { Card } from "@/components/ui/card";

export function ChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <Card>
      <span className="bg-stage-learn-tint text-stage-learn mb-4 inline-flex size-11 items-center justify-center rounded-xl">
        <BookOpen className="size-5" aria-hidden="true" />
      </span>
      <p className="text-eyebrow text-ink-3 font-semibold uppercase">
        Chapter {chapter.number}
      </p>
      <h3 className="text-ink mt-1 font-sans text-lg font-semibold">
        {chapter.title}
      </h3>
      <p className="text-ink-2 mt-1 text-sm">{chapter.description}</p>
      <div className="border-line mt-4 space-y-1.5 border-t pt-4">
        <p className="text-eyebrow text-ink-3 font-semibold uppercase">
          Covers
        </p>
        {chapter.covers.map((item) => (
          <p key={item} className="text-ink-2 text-xs">
            - {item}
          </p>
        ))}
      </div>
    </Card>
  );
}
