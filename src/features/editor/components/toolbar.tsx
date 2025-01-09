import React, { useState } from "react";
import { ActiveTool, Editor } from "./types";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) => {
  const selectedObjects = editor?.canvas.getActiveObject();

  const getProperty = (property: any) => {
    if (!selectedObjects) return null;

    return selectedObjects.get(property);
  };

  const fillColor = getProperty("fill");
  const fillColor2 = editor?.fillColor;

  const [property, setProperty] = useState(fillColor);

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="flex items-center h-full justify-center">
        <Hint label="カラー" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              onChangeActiveTool("fill");
            }}
            size={"icon"}
            variant={"outline"}
            className={cn(activeTool === "fill" && "bg-gray-100")}
          >
            <div
              className="rounded-sm size-4 border"
              style={{
                backgroundColor:
                  typeof fillColor === "string" ? fillColor : "black",
              }}
            ></div>
          </Button>
        </Hint>
      </div>
    </div>
  );
};
