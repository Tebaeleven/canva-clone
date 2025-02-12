import { fabric } from "fabric";
import { useCallback, useRef } from "react";

interface UseClipboardProps {
  canvas: fabric.Canvas | null;
}

export const useClipboard = ({ canvas }: UseClipboardProps) => {
  const clipboard = useRef<any>(null);

  const copy = useCallback(() => {
    canvas?.getActiveObject()?.clone((cloned: any) => {
      clipboard.current = cloned;
    });
  }, [canvas]);

  const paste = useCallback(() => {
    if (!clipboard.current) return;

    clipboard.current.clone((clonedObj: any) => {
      canvas?.discardActiveObject(); //最初に選択していたオブジェクトの選択を外す
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true, //クリックできるようにする
      });

      //複数選択された場合は、それらを順番に追加していく
      //activeSelectionは、複数選択を意味する
      //子要素は追加されるが、親要素は追加されないのでif文の後でcanvas.addする
      if (clonedObj.type === "activeSelection") {
        clonedObj.canvas = canvas;
        clonedObj.forEachObject((object: any) => {
          canvas?.add(object);
        });
        clonedObj?.setCoords();
      } else {
        canvas?.add(clonedObj);
      }

      clipboard.current.top = +10;
      clipboard.current.left = +10;

      canvas?.setActiveObject(clonedObj);
      canvas?.requestRenderAll();
    });
  }, [canvas]);

  return { copy, paste };
};
