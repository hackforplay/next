import test from 'ava';
import * as path from 'path';
import * as fs from 'fs-extra';
import { Image } from 'canvas';
import * as jsdom from 'jsdom';
import { render } from '.';
import { loadImages } from '../preloader';
import createScene from '../factories/createScene';

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

test('no loading render', t => {
  if (!(div instanceof window.HTMLDivElement)) return;

  const scene = createScene();
  t.throws(
    () => {
      render(scene, div);
    },
    'assets.images (index=100) has not found',
    'アセットのロードが完了していなければ例外を投げます'
  );
});

test('preload and render', async t => {
  const scene = createScene(true);
  await loadImages(scene);

  const copy = { ...scene };
  const state = {};
  render(scene, div, state);

  t.deepEqual(scene, copy, 'Renderer は scene を変更してはいけません');
  const canvas = div.querySelector('canvas');
  t.true(canvas instanceof window.HTMLCanvasElement, 'Canvas 要素がありません');

  const dataURL = canvas.toDataURL();
  const base64 = dataURL.split(',')[1];
  await fs.writeFile(tmpDir + '/rendered.png', base64, 'base64');
});
