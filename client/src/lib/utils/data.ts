import type { GridBlockAreaPlacement, ValueWithUnit } from './types';

export const valueWithUnitDefinitionToStyleValue = (value?: ValueWithUnit) => {
  if (value) {
    return `${value.value}${value.unit}`;
  }
};

export const valuesWithUnitDefinitionToStyleValue = (values?: ValueWithUnit[]) => {
  return (values ?? []).map((value) => valueWithUnitDefinitionToStyleValue(value)).join(' ');
};

export const gridBlockAreaPlacementToStyleValue = (placement: GridBlockAreaPlacement) => {
  return `${placement.start.row} / ${placement.start.column} / ${placement.end.row} / ${placement.end.column}`;
};
