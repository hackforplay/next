import * as t from '../types';

/**
 * Data URL から Image のロードを行い, assets に追加する
 * @param scene Scene object
 */
export default async function loadImages(scene: t.Scene) {
  const loadingAssets: Promise<void>[] = [];

  const existIndexes = scene.assets.images.map(i => i.index);

  for (const square of scene.map.squares) {
    if (existIndexes.indexOf(square.index) > -1) continue;
    const { type, src } = square.tile.image;
    if (type === 'data-url') {
      loadingAssets.push(
        new Promise((resolve, reject) => {
          const image = new Image();
          const asset = {
            image,
            index: square.index,
            isLoading: true
          };
          image.onload = () => {
            asset.isLoading = false;
            resolve();
          };
          image.onerror = e => reject(e);
          image.src = src;
          scene.assets.images.push(asset);
        })
      );
    }
  }

  await Promise.all(loadingAssets);
  return scene;
}
