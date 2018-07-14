import * as t from '../types';

/**
 *
 * @param scene Scene object
 * @param container Render target element
 * @param state Mutable state object
 */
export default function render(
  scene: t.Scene,
  container: HTMLElement,
  state = {}
) {
  const document = container.ownerDocument;
  const canvas = getCanvas(container);
  const ctx = canvas.getContext('2d');

  // 描画
  const {
    map: { tables, squares }
  } = scene;
}

function getCanvas(node: HTMLElement): HTMLCanvasElement {
  const existNode = node.querySelector('canvas');
  if (existNode) return existNode;
  const canvas = node.ownerDocument.createElement('canvas');
  node.appendChild(canvas);
  return canvas;
}
