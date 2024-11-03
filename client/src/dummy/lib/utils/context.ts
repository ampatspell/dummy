import { getContext, setContext } from 'svelte';

export class ContextModel<T> {
  constructor(private readonly key: string) {
    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
  }

  set(value: T) {
    return setContext(this.key, value);
  }

  get(required?: true): T;
  get(required: false): T | undefined;
  get(required: boolean = true): T | undefined {
    const key = this.key;
    const context = getContext(key) as T;
    if (!context && required) {
      throw new Error(`Context '${key}' not set`);
    }
    return context;
  }
}

export const createContext = <T>(key: string) => {
  return new ContextModel<T>(key);
};
