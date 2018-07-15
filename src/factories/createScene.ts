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

export default function createScene(): t.Scene {
  return {
    map: createMap(),
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
        tile: {
          size: [32, 32],
          image: {
            type: 'data-url',
            src: pipoya.grass
          },
          order: 'Below',
          collider: [false, false, false, false],
          author: {
            name: 'ぴぽや',
            url: 'http://blog.pipoya.net/'
          }
        }
      },
      {
        index: 101,
        tile: {
          size: [32, 32],
          image: {
            type: 'data-url',
            src: pipoya.rock
          },
          order: 'SortY',
          collider: [true, true, true, true],
          author: {
            name: 'ぴぽや',
            url: 'http://blog.pipoya.net/'
          }
        }
      },
      {
        index: 102,
        tile: {
          size: [32, 32],
          image: {
            type: 'data-url',
            src: pipoya.roof
          },
          order: 'Above',
          collider: [],
          author: {
            name: 'ぴぽや',
            url: 'http://blog.pipoya.net/'
          }
        }
      },
      {
        index: 103,
        tile: {
          size: [32, 32],
          image: {
            type: 'data-url',
            src: pipoya.flower
          },
          order: 'Inherit',
          collider: [], // Inherit
          author: {
            name: 'ぴぽや',
            url: 'http://blog.pipoya.net/'
          }
        }
      }
    ]
  };
}

export function createScreen(): t.SceneScreen {
  return {
    width: 320,
    height: 192
  };
}
