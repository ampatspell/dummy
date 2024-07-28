import type { GapDefinition, GridBlockAreaPlacementDefinition, GridBlockTrackDefinition, ValueWithUnitDefinition } from "$lib/types";

export const valueWithUnitDefinitionToStyleValue = (value: ValueWithUnitDefinition) => {
  if (value === 'auto') {
    return 'auto';
  } else {
    return `${value.value}${value.unit}`;
  }
};

export const gridBlockTrackDefinitionToStyleValue = (tracks: GridBlockTrackDefinition[]) => {
  return tracks
    .map((value) => {
      return valueWithUnitDefinitionToStyleValue(value);
    })
    .join(' ');
};

export const gapDefinitionToStyleValue = (gap: GapDefinition) => {
  const horizontal = valueWithUnitDefinitionToStyleValue(gap.horizontal);
  const vertical = valueWithUnitDefinitionToStyleValue(gap.vertical);
  return `${horizontal} ${vertical}`;
};

export const gridBlockAreaPlacementDefinitionToStyleValue = (placement: GridBlockAreaPlacementDefinition) => {
  return `${placement.start.row} / ${placement.start.column} / ${placement.end.row} / ${placement.end.column}`;
};
