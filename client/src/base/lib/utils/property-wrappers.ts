import { getter } from './options';
import { Property } from './property.svelte';

const numberToString = (number: number | undefined) => {
  if (typeof number === 'number') {
    if (!isNaN(number) && number !== Infinity) {
      return String(number);
    }
  }
  return '';
};

const stringToNumber = (string: string) => {
  const number = parseInt(string);
  if (!isNaN(number) && number !== Infinity) {
    return number;
  }
  return undefined;
};

export const optionalNumberToStringProperty = (source: Property<number | undefined>) => {
  return new Property<string>({
    value: getter(() => numberToString(source.value)),
    update: (value) => source.update(stringToNumber(value)),
  });
};

export const toOptional = <T>(source: Property<T>, fallback: T) => {
  return new Property<T | undefined>({
    value: getter(() => source.value),
    update: (value: T | undefined) => source.update(value ?? fallback),
  });
};

export const fromOptional = <T>(source: Property<T | undefined>, fallback: T) => {
  return new Property<T>({
    value: getter(() => source.value ?? fallback),
    update: (value) => source.update(value),
  });
};
