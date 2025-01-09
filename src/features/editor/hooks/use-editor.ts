import { useCallback, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./use-auto-resize";

const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({ canvas, container });

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#FFF",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

      //白いクリップオブジェクトを作成
      const initialWorkspace = new fabric.Rect({
        width: 1920,
        height: 1080,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,1)",
          blur: 10,
        }),
      });

      //クリップパスの設定
      //キャンバス上で表示される領域をinitialWorkspaceで制限
      initialCanvas.clipPath = initialWorkspace;

      //fabricjsのキャンバスサイズの設定
      initialCanvas.setHeight(initialContainer.offsetHeight);
      initialCanvas.setWidth(initialContainer.offsetWidth);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);

      const test = new fabric.Rect({
        width: 100,
        height: 100,
        fill: "red",
        rx: 10,
        ry: 10,
      });
      initialCanvas.add(test);
      initialCanvas.centerObject(test);

      const test2 = new fabric.Circle({
        radius: 50,
        fill: "blue",
      });
      initialCanvas.add(test2);
      initialCanvas.centerObject(test2);

      const text = new fabric.Text("今回のタイトル", {
        left: 100,
        top: 100,
      });
      initialCanvas.add(text);
      initialCanvas.centerObject(text);
    },
    [],
  );

  return {
    init,
  };
};

export default useEditor;
