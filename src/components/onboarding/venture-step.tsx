import { Input } from "@/components/ui/input";

export function VentureStep({
  name,
  description,
  onNameChange,
  onDescriptionChange,
}: {
  name: string;
  description: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}) {
  return (
    <div className="mx-auto max-w-md space-y-4">
      <Input
        label="Venture name"
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
        placeholder="Name your startup"
      />
      <Input
        label="One-line description"
        value={description}
        onChange={(event) => onDescriptionChange(event.target.value)}
        placeholder="What does it do, in one sentence?"
      />
    </div>
  );
}
