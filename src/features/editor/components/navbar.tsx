"use client";

import { Logo } from "@/features/editor/components/logo";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDownIcon,
  Download,
  FileIcon,
  MousePointer2,
  MousePointerClick,
  Redo2,
  Undo,
  Undo2,
} from "lucide-react";
import { BsCloudCheck } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { ActiveTool } from "./types";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Navbar = ({ activeTool, onChangeActiveTool }: NavbarProps) => {
  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full">
        {/* メニュー */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size={"sm"} variant={"ghost"}>
              ファイル
              <ChevronDownIcon className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>

          {/* コンテンツ */}
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              onClick={() => {}}
              className="flex items-center gap-x-2"
            >
              <CiFileOn className="size-8" />
              <div>
                <p>開く</p>
                <p className="text-xs text-muted-foreground">
                  JSONファイルを開く
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label="選択" side="bottom" sideOffset={10}>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              onChangeActiveTool("select");
            }}
            className={cn(activeTool === "select" && "bg-gray-100")}
          >
            <MousePointer2 />
          </Button>
        </Hint>
        <Hint label="戻す" side="bottom" sideOffset={10}>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {}}
            className=""
          >
            <Undo2 />
          </Button>
        </Hint>
        <Hint label="進む" side="bottom" sideOffset={10}>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {}}
            className=""
          >
            <Redo2 />
          </Button>
        </Hint>

        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-[20px] text-muted-foreground" />
          <div className="text-xs text-muted-foreground">保存済み</div>
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"sm"} variant={"ghost"}>
                エクスポート
                <Download />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => {}}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => {}}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => {}}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>HTML</p>
                  <p className="text-xs text-muted-foreground">
                    save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => {}}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
