import { options, type OptionsInput } from '../../../../../client/src/lib/utils/options';

export type PropertyDelegateOptions = {
  isDisabled?: boolean;
};

export type PropertyOptions<T> = {
  delegate?: PropertyDelegateOptions;
  value: T;
  update: (value: T) => void;
} & PropertyDelegateOptions;

export class Property<T> {
  options: PropertyOptions<T>;

  constructor(opts: OptionsInput<PropertyOptions<T>>) {
    this.options = options(opts);
  }

  isDisabled = $derived.by(() => {
    if (this.options.isDisabled) {
      return true;
    }

    const delegate = this.options.delegate;
    if (delegate && delegate.isDisabled) {
      return true;
    }

    return false;
  });

  value = $derived.by(() => this.options.value);

  update(next: T) {
    this.options.update(next);
  }
}
