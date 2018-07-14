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
export type Scene = {
  map: SceneMap;
};
