"use client";

import {
  ImageIcon,
  LayoutTemplate,
  Settings,
  Shapes,
  Sparkles,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { ActiveTool } from "./types";

interface SidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Sidebar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
  return (
    <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
      <ul className="flex flex-col">
        <SidebarItem
          icon={LayoutTemplate}
          label="デザイン"
          isActive={activeTool === "design"}
          onClick={() => {
            onChangeActiveTool("design");
          }}
        />
        <SidebarItem
          icon={ImageIcon}
          label="メディア"
          isActive={activeTool === "media"}
          onClick={() => {
            onChangeActiveTool("media");
          }}
        />
        <SidebarItem
          icon={Shapes}
          label="図形"
          isActive={activeTool === "shapes"}
          onClick={() => {
            onChangeActiveTool("shapes");
          }}
        />
        <SidebarItem
          icon={Sparkles}
          label="AI"
          isActive={activeTool === "ai"}
          onClick={() => {
            onChangeActiveTool("ai");
          }}
        />
        <SidebarItem
          icon={Settings}
          label="設定"
          isActive={activeTool === "settings"}
          onClick={() => {
            onChangeActiveTool("settings");
          }}
        />
      </ul>
    </aside>
  );
};
