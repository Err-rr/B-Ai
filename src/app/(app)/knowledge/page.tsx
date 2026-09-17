import { getChapters } from "@/lib/data/chapters";
import { ChapterCard } from "@/components/features/knowledge/chapter-card";

export default async function KnowledgePage() {
  const chapters = await getChapters();

  return (
    <div className="space-y-6 py-6">
      <div>
        <p className="text-eyebrow text-ink-3 font-semibold uppercase">
          Knowledge
        </p>
        <h1 className="text-ink font-sans text-3xl font-semibold">
          Bootcamp library
        </h1>
        <p className="text-ink-2 mt-1 text-sm">
          The bootcamp curriculum, in reference form. YFS-AI draws on this in
          every conversation — you don&rsquo;t have to read it in order.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter) => (
          <ChapterCard key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </div>
  );
}
