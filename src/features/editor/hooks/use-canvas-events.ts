import { fabric } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
}

export const useCanvasEvent = ({
  canvas,
  container,
  setSelectedObjects,
  clearSelectionCallback,
}: UseCanvasEventProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        setSelectedObjects(e.selected || []);
        console.log(e.selected);
      });
      canvas.on("selection:updated", (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:cleared", (e) => {
        setSelectedObjects([]);
        console.log("selection:cleared", clearSelectionCallback);
        clearSelectionCallback?.();
      });
    }

    return () => {
      canvas?.off("selection:created");
      canvas?.off("selection:updated");
      canvas?.off("selection:cleared");
    };
  }, [canvas, setSelectedObjects, clearSelectionCallback]); //no need for this,this is from setState
};
