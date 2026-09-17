import type { CXORole } from "@/lib/types/domain";
import { SelectableCard } from "@/components/ui/selectable-card";
import { PeekCards } from "./peek-cards";
import { ROLE_OPTIONS } from "./role-data";

export function RoleStep({
  selected,
  onSelect,
}: {
  selected: CXORole | null;
  onSelect: (role: CXORole) => void;
}) {
  const selectedOption = ROLE_OPTIONS.find((r) => r.role === selected);

  return (
    <div>
      <div className="min-h-32">
        {selectedOption && (
          <PeekCards
            roleLabel={selectedOption.role}
            peeks={selectedOption.peeks}
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {ROLE_OPTIONS.map((option) => (
          <SelectableCard
            key={option.role}
            icon={option.icon}
            title={option.role}
            description={option.leads}
            selected={selected === option.role}
            onSelect={() => onSelect(option.role)}
          />
        ))}
      </div>
    </div>
  );
}
