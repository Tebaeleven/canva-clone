"use client";

import { cn } from "@/lib/utils";
import {
  ActiveTool,
  Editor,
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "./types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface StrokeWidthSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokeWidthSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeWidthSidebarProps) => {
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "stroke-width" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="枠のオプション"
        description="図形の枠の太さを変更します"
      />
      <ScrollArea>
        <div className="p-4 space-y-6 border-b">
          <Label className="text-sm">枠の太さ</Label>
          <Slider
            max={20}
            value={[widthValue]}
            onValueChange={(value) => onChange(value[0])}
          />
        </div>
        <div className="p-4 space-y-6 border-b">
          <Label className="text-sm">枠の種類</Label>
          <Button
            onClick={() => onChangeStrokeType([])}
            variant={"secondary"}
            size={"lg"}
            className={cn(
              "w-full h-16 flex justify-start text-left",
              JSON.stringify(typeValue) === JSON.stringify([])
                ? "border border-blue-500"
                : "",
            )}
            style={{
              padding: "8px 16px",
            }}
          >
            <div className="w-full border-black rounded-full border-4"></div>
          </Button>
          <Button
            onClick={() => onChangeStrokeType([5, 5])}
            variant={"secondary"}
            size={"lg"}
            className={cn(
              "w-full h-16 flex justify-start text-left",
              JSON.stringify(typeValue) === JSON.stringify([5, 5])
                ? "border border-blue-500"
                : "",
            )}
            style={{
              padding: "8px 16px",
            }}
          >
            <div className="w-full border-black rounded-full border-4  border-dashed"></div>
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
