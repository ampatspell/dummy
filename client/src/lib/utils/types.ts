export type VoidCallback = () => void;

export type PageData = {
  identifier: string;
  title?: string;
  block?: string;
};

export type ValueWithUnit = {
  unit: 'fr' | 'px' | '%';
  value: number;
};

export type ValueWithUnitOrAuto = ValueWithUnit | 'auto';

export type BaseBlockData = {
  type: string;
};

export type TextBlockData = BaseBlockData & {
  type: 'text';
  text: string;
  fontSize?: ValueWithUnit;
};

export type PlaceholderBlockData = BaseBlockData & {
  type: 'placeholder';
};

export type GridBlockAreaPlacementPosition = {
  column: number;
  row: number;
};

export type GridBlockAreaPlacement = {
  start: GridBlockAreaPlacementPosition;
  end: GridBlockAreaPlacementPosition;
};

export type GridBlockAreaPlacementModelOptions = {
  placement: GridBlockAreaPlacement;
};

export type GridBlockAreaData = {
  placement: GridBlockAreaPlacement;
  block?: string;
};

export type GridBlockData = BaseBlockData & {
  type: 'grid';
  columns: ValueWithUnit[];
  rows: ValueWithUnit[];
  areas: GridBlockAreaData[];
};

export type BlockData = TextBlockData | PlaceholderBlockData | GridBlockData;
