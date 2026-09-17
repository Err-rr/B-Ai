import type { Message } from "@/lib/types/domain";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils/cn";
import { renderMarkdownLite } from "@/lib/utils/markdown-lite";

export function MessageBubble({ message }: { message: Message }) {
  const isAssistant = message.role === "assistant";

  if (isAssistant) {
    return (
      <div className="flex max-w-2xl items-start gap-3">
        <span className="bg-card border-line shadow-hover inline-flex size-8 shrink-0 items-center justify-center rounded-full border p-1.5">
          <Logo size={20} />
        </span>
        <div className="border-line bg-card text-ink-2 min-w-0 flex-1 rounded-2xl border p-6 text-sm leading-relaxed">
          {renderMarkdownLite(message.content)}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-dark text-on-dark ml-auto max-w-2xl rounded-2xl px-5 py-3 text-sm leading-relaxed",
      )}
    >
      {renderMarkdownLite(message.content)}
    </div>
  );
}
