import { Logo } from "@/components/ui/logo";

export function SiteFooter() {
  return (
    <footer className="border-line mx-auto max-w-6xl border-t px-6 py-8">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <span className="flex items-center gap-2">
          <Logo size={24} />
          <span className="text-ink text-sm font-medium">Bootcamp AI</span>
        </span>
        <p className="text-ink-3 text-xs">Run by Young Founders School.</p>
      </div>
    </footer>
  );
}
