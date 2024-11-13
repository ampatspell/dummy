import type { Size } from './types';

export function round(value: number, decimalPlaces: number = 2) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
}

export const progress = (total: number, transferred: number) => {
  if (total) {
    const percentage = (transferred / total) * 100;
    return round(percentage, 0);
  } else {
    return 0;
  }
};

export const sum = <T>(models: T[], cb: (model: T) => number) => {
  return models.reduce((total, model) => {
    return (total += cb(model));
  }, 0);
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  const size = sizes[i];
  return `${value}${size}`;
};

export const px = (number: number | undefined) => {
  if (number !== undefined) {
    return `${number}px`;
  }
};

const scope = <T>(cb: () => T): T => {
  return cb();
};

export const fit = (container: Size, content: Size) => {
  const multiplier = scope(() => {
    const calc = (a: number, b: number) => b / a;
    const w = calc(container.width, content.width);
    const h = calc(container.height, content.height);
    return Math.max(w, h);
  });
  const scale = (value: number) => value / multiplier;
  return {
    width: scale(content.width),
    height: scale(content.height),
  };
};
