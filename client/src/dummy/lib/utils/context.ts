import { getContext, setContext } from 'svelte';

export const createContext = <T>(key: string) => {
  return {
    set: (value: T) => setContext(key, value),
    get: () => getContext(key) as T,
  };
};
