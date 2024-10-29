import _murl from 'murl';

export type Murl<T extends object> = (input: string) => T | null;

export const murl = <T extends object>(pattern: string): Murl<T> => {
  return _murl(pattern);
};
