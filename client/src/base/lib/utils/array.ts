export type SortDescriptor<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: (object: T) => any;
  direction?: 'asc' | 'desc';
};

export function sortedBy<T>(arr: T[], descriptors: SortDescriptor<T> | SortDescriptor<T>[]): T[] {
  if (!Array.isArray(descriptors)) {
    descriptors = [descriptors];
  }
  let sorted = [...arr];
  for (const descriptor of descriptors) {
    sorted = sorted.sort((a, b) => {
      const av = descriptor.value(a);
      const bv = descriptor.value(b);
      if (av === bv) {
        return 0;
      }
      if (descriptor.direction === 'desc') {
        return av < bv ? 1 : -1;
      } else {
        return av < bv ? -1 : 1;
      }
    });
  }
  return sorted;
}

export const removeObjectAt = <T>(array: T[], index: number) => {
  if (index > -1) {
    array.splice(index, 1);
  }
};

export const addObject = <T>(array: T[], entry: T) => {
  if (array.includes(entry)) {
    return;
  }
  array.push(entry);
};

export const removeObject = <T>(array: T[], entry: T) => {
  const index = array.indexOf(entry);
  removeObjectAt(array, index);
};

export const insertObjectAt = <T>(array: T[], index: number, object: T) => {
  if (index > -1) {
    array.splice(index, 0, object);
  }
};

export function isTruthy<T>(value?: T | undefined | null | false): value is T {
  return !!value;
}

export const filterByInstanceOf = <I, O>(array: I[], factory: { new (...args: never): O }): O[] => {
  return array.filter((item) => item instanceof factory) as unknown as O[];
};
