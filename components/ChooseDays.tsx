import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";

interface ChooseDaysProps {
  value?: string;
  defaultValue?: string;
  options: { label: string; value: string }[];
  onValueChange?: (value: string) => void;
}

export default function ChooseDays({
  value,
  defaultValue,
  options,
  onValueChange,
}: ChooseDaysProps) {
  const selectedOption = options.find((opt) => opt.value === value);
  const defaultOption = options.find((opt) => opt.value === defaultValue);
  const displayLabel = selectedOption?.label || defaultOption?.label || "";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="text-slate-500 min-w-24">
          {displayLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <RadioGroup
          onValueChange={onValueChange}
          defaultValue={value}
          className="flex flex-col justify-between flex-wrap gap-2"
        >
          {options.map((option) => (
            <div className="flex items-center space-x-2" key={option.value}>
              <RadioGroupItem
                value={option.value}
                id={`option-${option.value}`}
              />
              <Label htmlFor={`option-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
}
