import { SceneScreen } from '../types';

export function getCanvas(
  node: HTMLElement,
  screen: SceneScreen
): HTMLCanvasElement {
  const existNode = node.querySelector('canvas');
  if (existNode) return existNode;
  if (!node.ownerDocument) {
    throw new Error('ownerDocument not set');
  }
  const canvas = node.ownerDocument.createElement('canvas');
  canvas.width = screen.width;
  canvas.height = screen.height;
  node.appendChild(canvas);
  return canvas;
}
