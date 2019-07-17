const loadedBitMap: {
  [index: number]: CanvasImageSource | null | undefined;
} = {};

/**
 * 画像アセットの Image を取得する. なければ null を返す
 * @param index unique number of images
 * @param src source url of image
 */
export function loadImage(
  index: number,
  src: string
): CanvasImageSource | null {
  const current = loadedBitMap[index];
  if (current !== undefined) return current;

  loadedBitMap[index] = null;
  const img = new Image();
  img.onload = () => {
    loadedBitMap[index] = img;
  };
  img.onerror = () => {
    console.error('Image load error: ' + src);
  };
  img.src = src;

  return null;
}
