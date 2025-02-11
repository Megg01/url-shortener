import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface ChooseSizeProps {
  defaultValue?: string;
  options: { label: string; value: string }[];
  onValueChange?: (value: string) => void;
}

export default function ChooseSize({
  defaultValue,
  options,
  onValueChange,
}: ChooseSizeProps) {
  return (
    <RadioGroup
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      className="flex justify-between flex-wrap gap-2"
    >
      {options.map((option) => (
        <div className="flex items-center" key={option.value}>
          <RadioGroupItem
            value={option.value}
            id={`option-${option.value}`}
            className="peer sr-only"
          />
          <Label
            htmlFor={`option-${option.value}`}
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
