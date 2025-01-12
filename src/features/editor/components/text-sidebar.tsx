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

interface TextSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TextSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TextSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "text" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader title="テキスト" description="テキストを追加します" />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Button
            onClick={() => {
              editor?.addText("テキスト", {});
            }}
            className="w-full"
          >
            テキスト
          </Button>
          <Button
            onClick={() => {
              editor?.addText("見出し1", {
                fontSize: 80,
                fontWeight: 700,
              });
            }}
            className="w-full h-16"
            size={"lg"}
          >
            <span className="text-3xl font-bold">見出し1</span>
          </Button>
          <Button
            onClick={() => {
              editor?.addText("見出し2", {
                fontSize: 50,
                fontWeight: 500,
              });
            }}
            className="w-full h-16"
            size={"lg"}
          >
            <span className="text-2xl font-bold">見出し2</span>
          </Button>
          <Button
            onClick={() => {
              editor?.addText("見出し3", {
                fontSize: 32,
              });
            }}
            className="w-full h-16"
            size={"lg"}
          >
            <span className="text-xl">見出し3</span>
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
