"use client";

import { ChromePicker, CirclePicker } from "react-color";
import { colors } from "./types";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {}}
        className="border rounded-lg"
      />
      <CirclePicker
        colors={colors}
        onChangeComplete={(color) => {}}
      />
    </div>
  );
};
