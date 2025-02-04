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

interface AISidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AISidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AISidebarProps) => {
  const mutations = useGenerationImage();

  const [prompt, setPrompt] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //TODO: block with paywall
    mutations.mutate(
      { prompt: prompt },
      {
        onSuccess: ({ data }) => {
          console.log(data);
          editor?.addImage(data);
        },
      },
    );
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "ai" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader title="AI" description="AIで画像を生成します" />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <form onSubmit={onSubmit}>
            <Textarea
              placeholder="An astronaut riding a horse on mars, hd, dramatic lighting"
              cols={30}
              rows={10}
              required
              minLength={3}
              value={prompt}
              disabled={mutations.isPending}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button type="submit" disabled={mutations.isPending}>
              生成
            </Button>
          </form>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
