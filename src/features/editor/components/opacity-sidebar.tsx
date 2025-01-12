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
import { useEffect, useMemo, useState } from "react";

interface OpacitySidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const OpacitySidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: OpacitySidebarProps) => {
  const initialValue = editor?.getActiveOpacity() || 1;
  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects],
  );

  //選択したオブジェクトの透明度を取得し、スライダーに適用する
  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject.get("opacity") || 1);
    }
  }, [selectedObject]);

  const [opacity, setOpacity] = useState(initialValue);
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: number) => {
    setOpacity(value);
    editor?.changeOpacity(value);
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "opacity" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="透明度のオプション"
        description="図形の透明度を変更します"
      />
      <ScrollArea>
        <div className="p-4 space-y-6 border-b">
          <Label className="text-sm">透明度</Label>
          <Slider
            max={1}
            min={0}
            step={0.1}
            value={[opacity]}
            onValueChange={(value) => onChange(value[0])}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
