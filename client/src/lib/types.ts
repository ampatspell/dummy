export type PageDefinition = {
  block: BlockDefinition;
};

export type BlockDefinition = {
  type: string;
};

export type ValueUnitDefinition = 'px' | 'fr' | '%';

export type ValueWithUnitDefinition = 'auto' | { value: number; unit: ValueUnitDefinition };

export type GapDefinition = { horizontal: ValueWithUnitDefinition; vertical: ValueWithUnitDefinition };

export type GridBlockTrackDefinition = ValueWithUnitDefinition;

export type ColumnRowPositionDefinition = {
  column: number;
  row: number;
};

export type GridBlockAreaPlacementDefinition = {
  start: ColumnRowPositionDefinition;
  end: ColumnRowPositionDefinition;
};

export type GridBlockAreaDefinition = {
  placement: GridBlockAreaPlacementDefinition;
  block: BlockDefinition;
};

export type GridBlockDefinition = BlockDefinition & {
  type: 'grid';
  columns: GridBlockTrackDefinition[];
  rows: GridBlockTrackDefinition[];
  gap: GapDefinition;
  areas: GridBlockAreaDefinition[];
};

export type TextBlockDefinition = BlockDefinition & {
  type: 'text';
  value: string;
};

export type PlaceholderBlockDefinition = BlockDefinition & {
  type: 'placeholder';
  width: ValueWithUnitDefinition;
  height: ValueWithUnitDefinition;
}
