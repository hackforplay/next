export type TileType =
  | 'Ground'
  | 'Wall'
  | 'Road'
  | 'Rug'
  | 'Barrier'
  | 'Float'
  | 'Sky';

export type Placement = {
  type: TileType;
  collider?: number[];
};
