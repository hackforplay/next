import * as Placement from './placement';

export type Placement = Placement.Placement;

export type Index = number;
export type Table = Index[][];
export type TileSize = number[];
export type TileImageType = 'data-url';
export type TileImage = {
  type: TileImageType;
  src: string;
};
export type TileAuthor = {
  name: string;
  url?: string;
};
export type Square = {
  index: Index;
  placement: Placement.Placement;
  tile: {
    size: TileSize;
    image: TileImage;
    author: TileAuthor;
  };
};
export type SceneMap = {
  tables: Table[];
  squares: Square[];
};
export type ImageAsset = {
  index: Index;
  isLoading: boolean;
  image: HTMLImageElement;
};
export type SceneAssets = {
  images: ImageAsset[];
};
export type SceneScreen = {
  width: number;
  height: number;
};
export type Scene = {
  debug: boolean;
  map: SceneMap;
  assets: SceneAssets;
  screen: SceneScreen;
};
