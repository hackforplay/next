import * as fs from 'fs';
import * as path from 'path';
import * as t from '../types';

const pipoya = {
  flower: dataURL('../resources/flower.png'),
  grass: dataURL('../resources/grass.png'),
  rock: dataURL('../resources/rock.png'),
  roof: dataURL('../resources/roof.png')
};

function dataURL(fileName: string) {
  const base64 = fs.readFileSync(path.resolve(__dirname, fileName), 'base64');
  return 'data:image/png;base64,' + base64;
}

export default function createScene(debug = false): t.Scene {
  return {
    debug,
    map: createMap(),
    assets: emptyAssets(),
    screen: createScreen()
  };
}

export function createMap(): t.SceneMap {
  return {
    tables: [
      [
        [103, -88, -88, -88, -88, -88, -88, -88, -88, 101],
        [103, -88, 102, 102, -88, -88, -88, -88, -88, 101],
        [103, -88, 102, 102, -88, -88, -88, -88, -88, 101],
        [-88, -88, 102, 102, -88, -88, -88, -88, -88, 101],
        [-88, -88, -88, -88, -88, -88, -88, -88, -88, 101],
        [-88, -88, -88, -88, -88, -88, -88, -88, -88, 101]
      ],
      [
        [102, -88, -88, -88, -88, -88, -88, -88, -88, -88],
        [102, -88, -88, -88, -88, -88, -88, -88, -88, -88],
        [102, -88, -88, 101, 101, 101, 101, -88, -88, -88],
        [102, -88, -88, 103, 103, 103, 103, -88, -88, -88],
        [102, -88, -88, -88, -88, -88, -88, -88, -88, -88],
        [102, -88, -88, -88, -88, -88, -88, -88, -88, -88]
      ],
      [
        [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        [100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
      ]
    ],
    squares: [
      {
        index: 100,
        placement: {
          type: 'Ground'
        },
        tile: {
          size: [32, 32],
          image: {
            type: 'data-url',
            src: pipoya.grass
          },
          author: {
            name: 'ぴぽや',
            url: 'http://blog.pipoya.net/'
          }
        }
      },
      {
        index: 101,
        placement: {
          type: 'Barrier'
        },
        tile: {
          size: [32, 32],
          image: {
            type: 'data-url',
            src: pipoya.rock
          },
          author: {
            name: 'ぴぽや',
            url: 'http://blog.pipoya.net/'
          }
        }
      },
      {
        index: 102,
        placement: {
          type: 'Sky'
        },
        tile: {
          size: [32, 32],
          image: {
            type: 'data-url',
            src: pipoya.roof
          },
          author: {
            name: 'ぴぽや',
            url: 'http://blog.pipoya.net/'
          }
        }
      },
      {
        index: 103,
        placement: {
          type: 'Rug'
        },
        tile: {
          size: [32, 32],
          image: {
            type: 'data-url',
            src: pipoya.flower
          },
          author: {
            name: 'ぴぽや',
            url: 'http://blog.pipoya.net/'
          }
        }
      }
    ]
  };
}

export function emptyAssets(): t.SceneAssets {
  return {
    images: []
  };
}

export function createScreen(): t.SceneScreen {
  return {
    width: 320,
    height: 192
  };
}
