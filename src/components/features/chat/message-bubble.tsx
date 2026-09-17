import { Sparkles } from "lucide-react";
import type { Message } from "@/lib/types/domain";
import { cn } from "@/lib/utils/cn";
import { renderMarkdownLite } from "@/lib/utils/markdown-lite";

export function MessageBubble({ message }: { message: Message }) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={cn(
        "relative max-w-2xl text-sm leading-relaxed",
        isAssistant
          ? "border-line bg-card text-ink-2 rounded-2xl border p-6 pt-7"
          : "bg-dark text-on-dark ml-auto rounded-2xl px-5 py-3",
      )}
    >
      {isAssistant && (
        <span className="bg-green text-on-accent absolute -top-3 -left-3 inline-flex size-8 items-center justify-center rounded-full">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
      )}
      {renderMarkdownLite(message.content)}
    </div>
  );
}
