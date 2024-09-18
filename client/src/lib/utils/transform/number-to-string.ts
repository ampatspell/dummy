import { invalid, Target } from './transform.svelte';

export class NumberToStringTarget extends Target<number, string> {
  toSource(value: string) {
    const number = parseInt(value);
    if (isNaN(number)) {
      return invalid;
    }
    return number;
  }

  toTarget(value: number) {
    return String(value);
  }
}

export const numberToString = () => new NumberToStringTarget();
