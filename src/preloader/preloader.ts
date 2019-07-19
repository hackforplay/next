export class Preloader {
  readonly store: {
    [index: number]: CanvasImageSource | null | undefined;
  } = {};
  private count = 0;

  public get loading() {
    return this.count > 0;
  }

  loadImage(index: number, src: string) {
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
    };
    img.src = src;
    this.count++;
  }
  getImage(index: number) {
    return this.store[index] || null;
  }
}
