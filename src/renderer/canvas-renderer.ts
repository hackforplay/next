import { debounce } from 'lodash-es';
import { Preloader } from '../preloader/preloader';
import { Scene, SceneScreen, Square } from '../types';
import { render } from './render';

export class CanvasRenderer {
  constructor(container: HTMLElement, screen: SceneScreen) {
    this.container = container;
    this.screen = screen;
  }

  readonly container: HTMLElement;
  readonly canvas: HTMLCanvasElement;
  readonly screen: SceneScreen;
  readonly preloader = new Preloader();

  private resolves: Function[] = [];

  update(scene: Scene): Promise<void> {
    const {
      map: { base, tables, squares }
    } = scene;
    const window = this.container.ownerDocument.defaultView;

    // { [key: number]: Square } にリマップ
    const indexSquareMap: { [key: number]: Square | undefined } = {};
    for (const square of squares) {
      indexSquareMap[square.index] = square;
    }

    const baseSquare = indexSquareMap[base];
    if (baseSquare) {
      this.preloader.loadImage(base, baseSquare.tile.image.src, window);
    }

    for (const table of tables) {
      for (const row of table.values()) {
        for (const index of row.values()) {
          const square = indexSquareMap[index];
          if (square) {
            this.preloader.loadImage(index, square.tile.image.src, window);
          }
        }
      }
    }

    if (!this.preloader.loading) {
      this.postRender.cancel();
      this.render(scene);
      return Promise.resolve();
    }
    return new Promise(resolve => {
      this.resolves.push(resolve);
      this.postRender(scene);
    });
  }

  postRender = debounce((scene: Scene) => {
    if (this.preloader.loading) {
      this.postRender(scene);
    } else {
      this.render(scene);
    }
  }, 50);

  render(scene: Scene) {
    render(scene, this.container, this.preloader);
    for (const resolve of this.resolves) {
      resolve();
    }
  }
}
