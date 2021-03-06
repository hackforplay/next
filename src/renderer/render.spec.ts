import test from 'ava';
import { Image } from 'canvas';
import * as jsdom from 'jsdom';
import * as path from 'path';
import { render } from '.';
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

test('render without preloader', async t => {
  const scene = createScene(true);

  const copy = { ...scene };
  render(scene, div);

  t.deepEqual(scene, copy, 'Renderer は scene を変更してはいけません');
});
