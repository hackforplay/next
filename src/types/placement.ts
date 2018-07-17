export type TileOrder =
  | 'Ground'
  | 'Terrain'
  | 'Road'
  | 'Rug'
  | 'Barrier'
  | 'Float'
  | 'Ornament'
  | 'Roof'
  | 'Sky';
export type Inherit = {
  type: 'Inherit';
};
export type Ground = {
  type: 'Ground';
};
export type Terrain = {
  type: 'Terrain';
};
export type Road = {
  type: 'Road';
};
export type Rug = {
  type: 'Rug';
};
export type Barrier = {
  type: 'Barrier';
};
export type Float = {
  type: 'Float';
};
export type Ornament = {
  type: 'Ornament';
};
export type Sky = {
  type: 'Sky';
};
export type Roof = {
  type: 'Roof';
};
export type Custom =
  | {
      type: 'Custom';
      insertBefore: TileOrder;
      colliders: [boolean, boolean, boolean, boolean];
    }
  | {
      type: 'Custom';
      insertAfter: TileOrder;
      colliders: [boolean, boolean, boolean, boolean];
    };
export type Placement =
  | Inherit
  | Ground
  | Terrain
  | Road
  | Rug
  | Barrier
  | Float
  | Ornament
  | Roof
  | Sky
  | Custom;
