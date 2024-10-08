import type { GridBlockAreaPlacement, ValueWithUnit, ValueWithUnitOrAuto } from './types';

export const valueWithUnitToStyleValue = (value?: ValueWithUnit) => {
  if (value) {
    return `${value.value}${value.unit}`;
  }
};

export const valueWithUnitOrAutoToStyleValue = (value?: ValueWithUnitOrAuto) => {
  if (value === 'auto') {
    return 'auto';
  }
  return valueWithUnitToStyleValue(value);
};

export const valuesWithUnitToStyleValue = (values?: ValueWithUnit[]) => {
  return (values ?? []).map((value) => valueWithUnitToStyleValue(value)).join(' ');
};

export const gridBlockAreaPlacementToStyleValue = (placement: GridBlockAreaPlacement) => {
  return `${placement.start.row} / ${placement.start.column} / ${placement.end.row} / ${placement.end.column}`;
};
