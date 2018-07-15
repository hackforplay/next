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
  const {
    map: { tables },
    assets: { images },
    screen
  } = scene;

  const canvas = getCanvas(container, screen);
  const ctx = canvas.getContext('2d');

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
