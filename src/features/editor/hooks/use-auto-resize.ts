import { fabric } from "fabric";
import { useCallback, useEffect } from "react";

interface UseAutoResizeProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
}

export const useAutoResize = ({ canvas, container }: UseAutoResizeProps) => {
  const autoZoom = useCallback(() => {
    if (!canvas || !container) return;

    // containerの幅と高さを取得
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // canvasの幅と高さをcontainerの幅と高さに設定
    canvas.setWidth(width);
    canvas.setHeight(height);

    // canvasの中心座標を取得
    const center = canvas.getCenter();

    // ズーム比率
    const zoomRatio = 0.85;

    // clipするオブジェクトを取得
    const localWorkspace = canvas
      .getObjects()
      .find((object) => object.name === "clip");

    // localWorkspaceをcontainerにフィットさせるスケールを計算
    //横幅、高さがlocalWorkspaceの横幅、高さになるようにスケールを計算
    // @ts-ignore
    const scale = fabric.util.findScaleToFit(localWorkspace, {
      width: width,
      height: height,
    });

    // スケールにズーム比率を掛けたズーム値を計算
    const zoom = scale * zoomRatio;

    // ビューポート変換を初期化
    // canvasの中心を基準にズーム
    canvas.setViewportTransform(fabric.iMatrix.concat());
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);

    // clipするオブジェクトがない場合、処理を終了
    if (!localWorkspace) return;

    // localWorkspaceの中心座標を取得
    const workspaceCenter = localWorkspace.getCenterPoint();
    // 現在のビューポート変換を取得
    const viewportTransform = canvas.viewportTransform;

    // canvasの幅、高さ、ビューポート変換が未定義の場合、処理を終了
    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    ) {
      return;
    }

    /**
     * viewportTransform配列の各要素の意味:
     * [0] スケールX - X軸方向のスケール（拡大・縮小）値
     * [1] スキューY - Y軸方向のスキュー（傾き）値
     * [2] スキューX - X軸方向のスキュー（傾き）値
     * [3] スケールY - Y軸方向のスケール（拡大・縮小）値
     * [4] オフセットX - X軸方向のオフセット（平行移動）値
     * [5] オフセットY - Y軸方向のオフセット（平行移動）値
     */

    // ビューポートのX軸オフセットを計算
    viewportTransform[4] =
      canvas.width / 2 - workspaceCenter.x * viewportTransform[0];
    // ビューポートのY軸オフセットを計算
    viewportTransform[5] =
      canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

    // 計算したビューポート変換をcanvasに設定
    canvas.setViewportTransform(viewportTransform);

    localWorkspace.clone((cloned: fabric.Rect) => {
      cloned.clipPath = cloned; // クローンしたオブジェクトにclipPathを設定
      canvas.requestRenderAll();
    });
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        autoZoom();
      });

      resizeObserver?.observe(container);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [canvas, container, autoZoom]);

  return { autoZoom };
};
