import React, { useState } from "react";
import { ActiveTool, Editor, FONT_SIZE, FONT_WEIGHT } from "./types";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";
import { ArrowDown, ArrowUp, ChevronDown, Trash, Trash2 } from "lucide-react";
import { RxTransparencyGrid } from "react-icons/rx";
import { isTextType } from "../utils";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa";
import { FontSizeInput } from "./font-size-input";
import { TbColorFilter } from "react-icons/tb";
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
  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle() || "normal";
  const initialFontUnderline = editor?.getActiveFontUnderline() || false;
  const initialFontLinethrough = editor?.getActiveFontLinethrough() || false;
  const initialTextAlign = editor?.getActiveTextAlign() || "left";
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;

  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontWeight: initialFontWeight,
    fontStyle: initialFontStyle,
    fontUnderline: initialFontUnderline,
    fontLinethrough: initialFontLinethrough,
    textAlign: initialTextAlign,
    fontSize: initialFontSize,
  });

  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectType = editor?.selectedObjects[0]?.type;

  const isText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image";

  const toggleBold = () => {
    if (!selectedObject) {
      return;
    }

    //500 -> 700, 700 -> 500
    const newWeight = properties.fontWeight > 500 ? 500 : 700;
    editor?.changeFontWeight(newWeight);
    setProperties((current) => ({ ...current, fontWeight: newWeight }));
  };

  const toggleItalic = () => {
    if (!selectedObject) {
      return;
    }

    const isItalic = properties.fontStyle === "italic";
    const newStyle = isItalic ? "normal" : "italic";
    editor?.changeFontStyle(newStyle);
    setProperties((current) => ({ ...current, fontStyle: newStyle }));
  };

  const toggleLinethrough = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = properties.fontLinethrough ? false : true;

    editor?.changeFontLinethrough(newValue);
    setProperties((current) => ({ ...current, fontLinethrough: newValue }));
  };

  const onChangeTextAlign = (value: string) => {
    if (!selectedObject) {
      return;
    }

    editor?.changeTextAlign(value);
    setProperties((current) => ({ ...current, textAlign: value }));
  };

  const onChangeFontSize = (value: number) => {
    if (!selectedObject) {
      return;
    }

    if (isNaN(value)) {
      return;
    }

    editor?.changeFontSize(value);
    setProperties((current) => ({ ...current, fontSize: value }));
  };

  const toggleUnderline = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = properties.fontUnderline ? false : true;

    editor?.changeFontUnderline(newValue);
    setProperties((current) => ({ ...current, fontUnderline: newValue }));
  };

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2"></div>
    );
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2 select-none">
      <div className="flex items-center h-full justify-center">
        {!isImage && (
          <Hint label="カラー" side="bottom" sideOffset={5}>
            <Button
              onClick={() => {
                onChangeActiveTool("fill");
              }}
              size={"icon"}
              variant={"ghost"}
              className={cn(activeTool === "fill" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border"
                style={{
                  backgroundColor: properties.fillColor,
                }}
              ></div>
            </Button>
          </Hint>
        )}
      </div>

      {!isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="枠のカラー" side="bottom" sideOffset={5}>
            <Button
              onClick={() => {
                onChangeActiveTool("stroke-color");
              }}
              size={"icon"}
              variant={"ghost"}
              className={cn(activeTool === "stroke-color" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border-2"
                style={{
                  borderColor: properties.strokeColor,
                }}
              ></div>
            </Button>
          </Hint>
        </div>
      )}

      {!isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="枠の太さ" side="bottom" sideOffset={5}>
            <Button
              onClick={() => {
                onChangeActiveTool("stroke-width");
              }}
              size={"icon"}
              variant={"ghost"}
              className={cn(activeTool === "stroke-width" && "bg-gray-100")}
            >
              <BsBorderWidth className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="フォント" side="bottom" sideOffset={5}>
            <Button
              onClick={() => {
                onChangeActiveTool("font");
              }}
              size={"icon"}
              variant={"ghost"}
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-gray-100",
              )}
            >
              <div className="max-w-[100px] truncate">
                {properties.fontFamily}
              </div>
              <ChevronDown className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="太字" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleBold}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.fontWeight > 500 && "bg-gray-100")}
            >
              <FaBold className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="イタリック" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleItalic}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.fontStyle === "italic" && "bg-gray-100")}
            >
              <FaItalic className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="下線" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleUnderline}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.fontUnderline && "bg-gray-100")}
            >
              <FaUnderline className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="取り消し線" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleLinethrough}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.fontLinethrough && "bg-gray-100")}
            >
              <FaStrikethrough className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="左寄せ" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("left")}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.textAlign === "left" && "bg-gray-100")}
            >
              <FaAlignLeft className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="中央寄せ" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("center")}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.textAlign === "center" && "bg-gray-100")}
            >
              <FaAlignCenter className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="右寄せ" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("right")}
              size={"icon"}
              variant={"ghost"}
              className={cn(properties.textAlign === "right" && "bg-gray-100")}
            >
              <FaAlignRight className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <FontSizeInput
            value={properties.fontSize}
            onChange={onChangeFontSize}
          />
        </div>
      )}

      {isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="フィルター" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("filter")}
              size={"icon"}
              variant={"ghost"}
              className={cn(activeTool === "filter" && "bg-gray-100")}
            >
              <TbColorFilter className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      <div className="flex items-center h-full justify-center">
        <Hint label="レイヤーを下に移動" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              editor?.sendBackwards();
            }}
            size={"icon"}
            variant={"ghost"}
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="レイヤーを上に移動" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              editor?.bringForward();
            }}
            size={"icon"}
            variant={"ghost"}
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="透明度を設定" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              onChangeActiveTool("opacity");
            }}
            size={"icon"}
            variant={"ghost"}
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="削除" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              editor?.delete();
            }}
            size={"icon"}
            variant={"ghost"}
          >
            <Trash2 className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
