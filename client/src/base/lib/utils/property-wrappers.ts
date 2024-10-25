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
