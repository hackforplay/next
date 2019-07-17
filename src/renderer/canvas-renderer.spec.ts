import test from 'ava';
import { Image } from 'canvas';
import * as fs from 'fs-extra';
import * as jsdom from 'jsdom';
import * as path from 'path';
import createScene from '../factories/createScene';
import { CanvasRenderer } from './canvas-renderer';

let window: jsdom.DOMWindow;
let div: any;
const tmpDir = path.resolve(__dirname, '../../tmp');

// export Image constractor from node-canvas project
(global as any).Image = Image as any;

test.before('generate DOM', t => {
  window = new jsdom.JSDOM(`<!DOCTYPE html><div></div>`).window;
  div = window.document.querySelector('div');
  t.true(div instanceof window.HTMLDivElement);
});

test.before('make tmp directory', async t => {
  await fs.mkdirp(tmpDir);
});

test('preload and render', async t => {
  const scene = createScene(true);
  const renderer = new CanvasRenderer(div, scene.screen);

  const copy = { ...scene };
  await renderer.update(copy);

  t.deepEqual(scene, copy, 'Renderer は scene を変更してはいけません');
  const canvas = div.querySelector('canvas');
  t.true(canvas instanceof window.HTMLCanvasElement, 'Canvas 要素がありません');

  const dataURL = canvas.toDataURL();
  const base64 = dataURL.split(',')[1];
  await fs.writeFile(tmpDir + '/rendered.png', base64, 'base64');
});
