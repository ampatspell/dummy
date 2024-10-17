import { options, type OptionsInput } from './options';

export type PropertyDelegateOptions = {
  isDisabled?: boolean;
};

export class PropertyValidator {}

export type PropertyOptions<T> = {
  delegate?: PropertyDelegateOptions;
  label?: string;
  value: T;
  update: (value: T) => void;
  validator?: PropertyValidator;
} & PropertyDelegateOptions;

export class Property<T, O extends PropertyOptions<T> = PropertyOptions<T>> {
  protected readonly options: O;

  constructor(opts: OptionsInput<O>) {
    this.options = options(opts);
  }

  readonly label = $derived.by(() => this.options.label);

  readonly isDisabled = $derived.by(() => {
    if (this.options.isDisabled) {
      return true;
    }

    const delegate = this.options.delegate;
    if (delegate && delegate.isDisabled) {
      return true;
    }

    return false;
  });

  readonly value = $derived.by(() => this.options.value);

  update(next: T) {
    this.options.update(next);
  }
}

export type PropertiesOptions = {
  isDisabled?: boolean;
};

export abstract class Properties<O extends PropertiesOptions = PropertiesOptions> {
  protected readonly options: O;

  constructor(opts: OptionsInput<O>) {
    this.options = options(opts);
  }

  get isDisabled() {
    return this.options.isDisabled;
  }

  abstract readonly all: PropertyOrProperties[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropertyOrProperties = Property<any> | Properties;
