import * as t from '../types';
import NotLoadedError from '../errors/not-loaded';

export const size = 32;

/**
 *
 * @param scene Scene object
 * @param container Render target element
 * @param state Mutable state object
 */
export function render(scene: t.Scene, container: HTMLElement, state = {}) {
  const {
    map: { tables },
    assets: { images },
    screen
  } = scene;

  const canvas = getCanvas(container, screen);
  const ctx = canvas.getContext('2d');

  const indexPairAssets: t.ImageAsset[] = [];
  for (const asset of images) {
    indexPairAssets[asset.index] = asset;
  }

  // とりあえず全部同じように描画
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const table of [...tables].reverse()) {
    for (const [y, row] of table.entries()) {
      for (const [x, index] of row.entries()) {
        if (index < 0) continue; // nope
        const assets = indexPairAssets[index];
        if (!assets || assets.isLoading) {
          throw new NotLoadedError(assets, index);
        }
        ctx.drawImage(assets.image, x * size, y * size);
      }
    }
  }
}

function getCanvas(
  node: HTMLElement,
  screen: t.SceneScreen
): HTMLCanvasElement {
  const existNode = node.querySelector('canvas');
  if (existNode) return existNode;
  const canvas = node.ownerDocument.createElement('canvas');
  canvas.width = screen.width;
  canvas.height = screen.height;
  node.appendChild(canvas);
  return canvas;
}
