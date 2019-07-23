import { Preloader } from '../preloader';
import * as t from '../types';
import { getCanvas } from './get-canvas';

export const size = 32;

export function render(
  scene: t.Scene,
  container: HTMLElement,
  preloader?: Preloader
) {
  const {
    debug,
    map: { base, tables, squares },
    screen
  } = scene;

  const canvas = getCanvas(container, screen);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // { [key: number]: Square } にリマップ
  const indexSquareMap: { [key: number]: t.Square | undefined } = {};
  for (const square of squares) {
    indexSquareMap[square.index] = square;
  }

  const front = tables && tables[0];
  const row = front && front.length;
  const column = front && front[0] && front[0].length;

  // とりあえず全部同じように描画
  const baseImage = preloader && preloader.getImage(base);
  const pattern = baseImage && ctx.createPattern(baseImage, 'repeat');
  if (pattern) {
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  if (debug) {
    ctx.fillStyle = 'white';
    // verticals
    for (let y = 0; y < row; y++) {
      ctx.fillRect(0, y * size - 1, canvas.width, 2);
    }
    // horizontals
    for (let x = 0; x < column; x++) {
      ctx.fillRect(x * size - 1, 0, 2, canvas.height);
    }
  }
  for (const table of [...tables].reverse()) {
    for (const [y, row] of table.entries()) {
      for (const [x, index] of row.entries()) {
        if (index < 0) continue; // nope
        const square = indexSquareMap[index];
        if (!square) continue; // not found
        const { placement } = square;
        const image = preloader && preloader.getImage(index);
        if (!image) continue;
        const collider = getCollider(placement);

        const edge = debug ? 1 : 0; // debug mode ではタイルのエッジに白または赤の border を描画する
        const left = x * size + edge;
        const top = y * size + edge;
        const len = size - 2 * edge;
        if (debug && collider > -1) {
          ctx.strokeStyle = collider === 1 ? 'red' : 'white';
          ctx.lineWidth = edge * 2;
          ctx.strokeRect(left, top, len, len);
        }
        ctx.drawImage(image, edge, edge, len, len, left, top, len, len);
      }
    }
  }
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
