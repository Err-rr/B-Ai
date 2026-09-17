import { notFound } from "next/navigation";
import { getTool } from "@/lib/data/tools";
import { Card } from "@/components/ui/card";
import { getToolIcon } from "@/lib/utils/icon-registry";

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const foundTool = await getTool(slug);
  if (!foundTool) notFound();

  const tool = { ...foundTool, Icon: getToolIcon(foundTool.icon) };

  return (
    <div className="max-w-2xl space-y-6 py-8">
      <div className="flex items-center gap-4">
        <span className="bg-stage-learn-tint text-stage-learn inline-flex size-12 items-center justify-center rounded-xl">
          <tool.Icon className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-ink font-sans text-3xl font-semibold">
            {tool.title}
          </h1>
          <p className="text-ink-2 text-sm">{tool.description}</p>
        </div>
      </div>

      <Card>
        <p className="text-ink-2 text-sm">
          This tool&rsquo;s guided flow is part of the live product, not this
          frontend build. Every founder on the team can open it — CXO roles are
          about who leads, never about who&rsquo;s allowed in.
        </p>
      </Card>
    </div>
  );
}
