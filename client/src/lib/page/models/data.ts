export type PageData = {
  identifier: string;
  title?: string;
  block?: string;
};

export type Unit = 'fr' | 'px' | '%';

export type ValueWithUnit = {
  value: number;
  unit: Unit;
};

export type BaseBlockData = { type: string };

export type TextBlockData = BaseBlockData & { type: 'text', text: string };

export type PlaceholderBlockData = BaseBlockData & { type: 'placeholder', };

export type GridBlockAreaPlacementPosition = {
  column: number;
  row: number;
};

export type GridBlockAreaPlacement = {
  start: GridBlockAreaPlacementPosition;
  end: GridBlockAreaPlacementPosition;
};

export type GridBlockAreaData = {
  placement: GridBlockAreaPlacement;
  block?: string;
};

export type GridBlockData = BaseBlockData & {
  type: 'grid',
  columns: ValueWithUnit[];
  rows: ValueWithUnit[];
  areas: GridBlockAreaData[];
};

export type BlockData = TextBlockData | PlaceholderBlockData | GridBlockData;
