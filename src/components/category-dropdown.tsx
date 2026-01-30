import { Select, SelectItem } from "@heroui/react";
import { OptionType } from "@/types";

type CategoryDropdownProps = {
  options: OptionType[];
  onSelectionChange?: (key: string) => void;
};

export default function CategoryDropdown({
  options,
  onSelectionChange,
}: CategoryDropdownProps) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        className="max-w-xs"
        classNames={{
          trigger: 'bg-blue-600/20 hover:!bg-blue-500/20',
        }}
        label="Category"
        size="sm"
        onSelectionChange={(keys) => {
          const selectedValue = Array.from(keys)[0] as string;

          onSelectionChange?.(selectedValue);
        }}
      >
        {options.map((option) => (
          <SelectItem key={option.value}>{option.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
