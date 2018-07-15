import './canvas-prebuilt';

export type Index = number;
export type Table = Index[][];
export type TileSize = [number, number];
export type TileImageType = 'data-url';
export type TileImage = {
  type: TileImageType;
  src: string;
};
export type TileOrder = 'Inherit' | 'Below' | 'SortY' | 'Above';
export type TileCollider = boolean[];
export type TileAuthor = {
  name: string;
  url?: string;
};
export type Square = {
  index: Index;
  tile: {
    size: TileSize;
    image: TileImage;
    order: TileOrder;
    collider: TileCollider;
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
  map: SceneMap;
  assets: SceneAssets;
  screen: SceneScreen;
};
