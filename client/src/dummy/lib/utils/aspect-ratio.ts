export const aspectRatios = ['3x2', '4x3', '2x3', '3x4', '1x1'] as const;

export type AspectRatio = (typeof aspectRatios)[number];

export type AspectRatioMapping<T> = { [key in AspectRatio]: T };

export const aspectRatioValues: AspectRatioMapping<number> = {
  '3x2': 3 / 2,
  '4x3': 4 / 3,
  '2x3': 2 / 3,
  '3x4': 3 / 4,
  '1x1': 1,
} as const;

export const aspectRatioLabels: AspectRatioMapping<string> = {
  '2x3': '3x2 (portrait)',
  '3x2': '3x2 (landscape)',
  '3x4': '4x3 (portrait)',
  '4x3': '4x3 (landscape)',
  '1x1': 'Square',
} as const;
