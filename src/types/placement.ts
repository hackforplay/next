export type TileType =
  | 'Nope'
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
