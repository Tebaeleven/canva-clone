import { fabric } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
  setSelectedObject: (object: fabric.Object[]) => void;
}

export const useCanvasEvent = ({
  canvas,
  container,
  setSelectedObject,
}: UseCanvasEventProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        setSelectedObject(e.selected || []);
      });
      canvas.on("selection:updated", (e) => {
        setSelectedObject(e.selected || []);
      });
      canvas.on("selection:cleared", (e) => {
        setSelectedObject([]);
      });
    }

    return () => {
      canvas?.off("selection:created");
      canvas?.off("selection:updated");
      canvas?.off("selection:cleared");
    };
  }, [canvas, setSelectedObject]); //no need for this,this is from setState
};
