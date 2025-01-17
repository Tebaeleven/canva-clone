import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FontSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const FontSizeInput = ({ value, onChange }: FontSizeInputProps) => {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onChange(value);
  };

  return (
    <div className="flex items-center">
      <Button
        variant={"outline"}
        className="p-2 rounded-r-none border-r-0"
        onClick={decrement}
        size={"icon"}
      >
        <Minus className="size-4" />
      </Button>
      <Input
        className="w-[50px] h-8 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none"
        value={value}
        onChange={handleChange}
      />

      <Button
        variant={"outline"}
        onClick={increment}
        size={"icon"}
        className="p-2 rounded-l-none border-l-0"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
