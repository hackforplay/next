import test from 'ava';
import * as path from 'path';
import * as fs from 'fs-extra';
import createScene from './createScene';

const tmpDir = path.resolve(__dirname, '../../tmp');

test.before('make tmp directory', async () => {
  await fs.mkdirp(tmpDir);
});

test('create scene', async t => {
  const scene = createScene();
  await fs.writeFile(
    path.join(tmpDir, 'init.json'),
    JSON.stringify(scene, null, 2)
  );
  t.pass();
});
