import { useCallback } from "react";
import { fabric } from "fabric";

const useEditor = () => {
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

      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,1)",
          blur: 10,
        }),
      });

      initialCanvas.clipPath = initialWorkspace;

      //fabricjsのキャンバスサイズの設定
      initialCanvas.setHeight(initialContainer.offsetHeight);
      initialCanvas.setWidth(initialContainer.offsetWidth);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;
      console.log("initializing editor");

      const test = new fabric.Rect({
        width: 100,
        height: 100,
        fill: "red",
      });
      initialCanvas.add(test);
      initialCanvas.centerObject(test);
    },
    [],
  );

  return {
    init,
  };
};

export default useEditor;
