import { fabric } from "fabric";
import * as material from "material-colors";

export const fonts = [
  "Arial",
  "Helvetica",
  "Arial Black",
  "Times New Roman",
  "Verdana",
  "Impact",
  "Comic Sans MS",
  "Lucida Sans Unicode",
  "Geneva",
  "Lucida Console",
];

//これらのツールはオブジェクトが選択されていない時には表示しない
export const selectionDependentTools = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.blueGrey["500"],
  material.grey["500"],
  "transparent",
];

export const filters = [
  "none",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "brightness",
  "greyscale",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "saturation",
  "gamma",
];

export type ActiveTool =
  | "select"
  | "design"
  | "shapes"
  | "text"
  | "media"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 1;
export const STROKE_DASH_ARRAY = [];

//Text
export const FONT_SIZE = 32;
export const FONT_FAMILY = "Arial";
export const FONT_WEIGHT = 400;

export const CIRCLE_OPTIONS = {
  radius: 50,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  angle: 0,
};

export const RECTANGLE_OPTIONS = {
  width: 100,
  height: 100,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  angle: 0,
};

export const DIAMOND_OPTIONS = {
  width: 100,
  height: 100,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  angle: 0,
};

export const TRIANGLE_OPTIONS = {
  width: 100,
  height: 100,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  angle: 0,
};

export const TEXT_OPTIONS = {
  type: "textbox",
  width: 100,
  height: 100,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  angle: 0,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};

export interface EditorHookProps {
  clearSelectionCallback?: () => void;
}

export type BuildEditorProps = {
  canvas: fabric.Canvas;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  selectedObjects: fabric.Object[];
  strokeDashArray: number[];
  fontFamily: string;

  setFillColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  setStrokeDashArray: (dashArray: number[]) => void;
  setFontFamily: (fontFamily: string) => void;
};

export interface Editor {
  
  //フィルター
  getActiveImageFilter: () => string[];
  changeImageFilter: (value: string) => void;

  //要素の削除
  delete: () => void;

  //Image
  addImage: (value: string) => void;

  //Text
  changeFontUnderline: (value: boolean) => void;
  getActiveFontUnderline: () => boolean;

  changeFontLinethrough: (value: boolean) => void;
  getActiveFontLinethrough: () => boolean;

  changeFontSize: (value: number) => void;
  getActiveFontSize: () => number;

  changeTextAlign: (value: string) => void;
  getActiveTextAlign: () => string;

  changeFontStyle: (style: string) => void;
  getActiveFontStyle: () => string;
  changeFontWeight: (weight: number) => void;
  getActiveFontWeight: () => number;
  getActiveFontFamily: () => string;
  changeFontFamily: (fontFamily: string) => void;
  addText: (value: string, options?: fabric.ITextboxOptions) => void;

  //Opacity
  getActiveOpacity: () => number;
  changeOpacity: (value: number) => void;

  //レイヤー処理
  bringForward: () => void;
  sendBackwards: () => void;

  changeFillColor: (color: string) => void;
  changeStrokeColor: (color: string) => void;
  changeStrokeWidth: (width: number) => void;
  changeStrokeDashArray: (value: number[]) => void;

  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;

  canvas: fabric.Canvas;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  selectedObjects: fabric.Object[];
}
