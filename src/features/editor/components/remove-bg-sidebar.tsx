"use client";

import { cn } from "@/lib/utils";
import { ActiveTool, Editor, FILL_COLOR } from "./types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGenerationImage } from "@/features/ai/api/use-generate-image";
import React, { useState } from "react";
import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import { useRemoveBg } from "@/features/ai/api/use-remove-bg";
interface RemoveBgSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const RemoveBgSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: RemoveBgSidebarProps) => {
  const mutation = useRemoveBg();
  const selectedObject = editor?.selectedObjects[0];

  //@ts-ignore
  const imageSrc = selectedObject?._originalElement?.currentSrc;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onClick = () => {
    mutation.mutate(
      { image: imageSrc },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
      },
    );
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "remove-bg" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader title="背景除去" description="背景を除去します" />
      {!imageSrc && (
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            背景除去する画像を選択してください
          </p>
        </div>
      )}
      {imageSrc && (
        <ScrollArea>
          <div className="p-4 space-y-4">
            <div
              className={cn(
                "relative aspect-square rounded-sm overflow-hidden transition bg-muted",
                mutation.isPending && "opacity-50",
              )}
            >
              <Image
                src={imageSrc}
                fill
                alt="Image"
                className=" object-cover"
              ></Image>
            </div>
            <Button
              className="w-full"
              onClick={onClick}
              disabled={mutation.isPending}
            >
              背景除去
            </Button>
          </div>
        </ScrollArea>
      )}
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
