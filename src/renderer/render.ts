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
    debug,
    map: { tables, squares },
    assets: { images },
    screen
  } = scene;

  const canvas = getCanvas(container, screen);
  const ctx = canvas.getContext('2d');

  const indexPairAssets: t.ImageAsset[] = [];
  for (const asset of images) {
    indexPairAssets[asset.index] = asset;
  }

  // { [key: number]: Square } にリマップ
  const indexSquareMap: { [key: number]: t.Square } = {};
  for (const square of squares) {
    indexSquareMap[square.index] = square;
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

        const { placement } = indexSquareMap[index];
        const collider = getCollider(placement);

        const edge = debug ? 1 : 0; // debug mode ではタイルのエッジに白または赤の border を描画する
        const left = x * size + edge;
        const top = y * size + edge;
        const len = size - 2 * edge;
        if (debug) {
          if (collider === 1) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = edge * 2;
            ctx.strokeRect(left, top, len, len);
          }
        }
        ctx.drawImage(assets.image, edge, edge, len, len, left, top, len, len);
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

/**
 * 当たり判定
 * @param {Object} placement
 * @return 壁: 1, 通路: 0, 継承: -1
 */
function getCollider(placement: t.Placement) {
  switch (placement.type) {
    case 'Wall':
    case 'Barrier':
      return 1;
    case 'Ground':
    case 'Road':
      return 0;

    case 'Rug':
    case 'Float':
    case 'Sky':
    default:
      return -1;
  }
}
