import * as t from '../types';

export default class NotLoadedError extends Error {
  constructor(asset: t.ImageAsset, index: number) {
    super(
      `assets.images (index=${index}) has not ${asset ? 'loaded yet' : 'found'}`
    );
  }
}
