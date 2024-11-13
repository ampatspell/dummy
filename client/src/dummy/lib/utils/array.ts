export type SortDescriptor<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: (object: T) => any;
  direction?: 'asc' | 'desc';
};

export type SortDescriptors<T> = SortDescriptor<T> | SortDescriptor<T>[];

export function sortedBy<T>(arr: T[], descriptors: SortDescriptors<T>): T[] {
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

export function lastObject<T>(arr: readonly T[]) {
  return arr[arr.length - 1];
}

export function nextObject<T>(array: readonly T[], item: T, wrap: boolean = false) {
  const idx = array.indexOf(item);
  if (idx === -1) {
    return;
  } else if (wrap && idx === array.length - 1) {
    return array[0];
  }
  return array[idx + 1];
}

export const prevObject = <T>(array: readonly T[], object: T, wrap: boolean = false) => {
  const idx = array.indexOf(object);
  if (idx === -1) {
    return;
  }
  if (idx === 0) {
    if (wrap) {
      return lastObject(array);
    }
    return;
  }
  return array[idx - 1];
};

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
