import { SkeletonCard, SkeletonRow } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Section } from "./section";

export function SkeletonsSection() {
  return (
    <Section title="Skeletons">
      <div className="grid grid-cols-3 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <Card className="flex flex-col justify-center gap-4">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </Card>
      </div>
    </Section>
  );
}
