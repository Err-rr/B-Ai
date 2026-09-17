import Link from "next/link";
import type { Tool } from "@/lib/types/domain";
import { Card } from "@/components/ui/card";
import { getToolIcon } from "@/lib/utils/icon-registry";

export function ToolGrid({ tools }: { tools: Tool[] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-ink font-sans text-lg font-semibold">Tools</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const display = { ...tool, Icon: getToolIcon(tool.icon) };
          return (
            <Link key={tool.id} href={`/tools/${tool.slug}`}>
              <Card interactive className="h-full">
                <span className="bg-stage-learn-tint text-stage-learn mb-3 inline-flex size-10 items-center justify-center rounded-lg">
                  <display.Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="text-ink font-sans text-base font-semibold">
                  {display.title}
                </p>
                <p className="text-ink-2 mt-1 text-sm">{display.description}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
