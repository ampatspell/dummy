class OptionsGetter<T> {
  private _value: () => T;

  constructor(fn: () => T) {
    this._value = fn;
  }

  get value() {
    return this._value();
  }
}

export const getter = <T>(fn: () => T) => new OptionsGetter<T>(fn);

export type OptionsInput<T> = {
  [K in keyof T]: T[K] | OptionsGetter<T[K]>;
};

class Options<T> {
  constructor(args: OptionsInput<T>) {
    for (const key in args) {
      const arg = args[key];
      if (arg instanceof OptionsGetter) {
        Object.defineProperty(this, key, { get: () => arg.value });
      } else {
        Object.defineProperty(this, key, { get: () => arg });
      }
    }
  }
}

export const options = <T>(args: OptionsInput<T>): T => {
  if (args instanceof Options) {
    return args as T;
  }
  return new Options<T>(args) as T;
};
