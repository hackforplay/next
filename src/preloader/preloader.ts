import { onOnline } from './onOnline';

export class Preloader {
  readonly store: {
    [index: number]: CanvasImageSource | null | undefined;
  } = {};

  /**
   * 現在ロード中のリソースの数を表す整数値
   */
  private count = 0;

  public get loading() {
    return this.count > 0;
  }

  loadImage(index: number, src: string, defaultView: Window | null) {
    const current = this.store[index];
    if (current !== undefined) return;

    this.store[index] = null;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.store[index] = img;
      this.count--;
    };
    img.onerror = () => {
      console.error('Image load error: ' + src);
      this.count--;
      // オンラインになったら再ロードする
      onOnline(defaultView, () => {
        this.loadImage(index, src, defaultView);
      });
    };
    img.src = src;
    this.count++;
  }
  getImage(index: number) {
    return this.store[index] || null;
  }
}
