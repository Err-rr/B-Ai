import { Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-line mx-auto max-w-6xl border-t px-6 py-8">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <span className="flex items-center gap-2">
          <span className="bg-green text-on-accent inline-flex size-6 items-center justify-center rounded-md">
            <Sparkles className="size-3.5" aria-hidden="true" />
          </span>
          <span className="text-ink text-sm font-medium">Bootcamp AI</span>
        </span>
        <p className="text-ink-3 text-xs">Run by Young Founders School.</p>
      </div>
    </footer>
  );
}
