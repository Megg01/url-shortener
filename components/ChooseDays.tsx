import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";

interface ChooseDaysProps {
  defaultValue?: string;
  options: { label: string; value: string }[];
  onValueChange?: (value: string) => void;
}

export default function ChooseDays({
  defaultValue,
  options,
  onValueChange,
}: ChooseDaysProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="text-slate-500">
          {defaultValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <RadioGroup
          onValueChange={onValueChange}
          defaultValue={defaultValue}
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
