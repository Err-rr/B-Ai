export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-eyebrow text-ink-3 font-semibold uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
