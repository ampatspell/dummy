import { Model } from '../firebase/fire/model.svelte';

export type PropertyDelegateOptions = {
  didUpdate?: (property: Property) => void;
};

export type PropertyOptions<T> = {
  delegate?: PropertyDelegateOptions;
  value: T;
  update: (value: T) => void;
} & PropertyDelegateOptions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Property<T = any, O extends PropertyOptions<T> = PropertyOptions<T>> extends Model<O> {
  readonly value = $derived.by(() => this.options.value);

  private didUpdate() {
    this.options.delegate?.didUpdate?.(this);
  }

  update(next: T) {
    if (this.value !== next) {
      this.options.update(next);
      this.didUpdate();
    }
  }

  delegate = $derived(this.options.delegate);
}

export type PropertiesOptions = {
  didUpdate?: (properties: Properties, property: Property) => void;
};

export abstract class Properties<O extends PropertiesOptions = PropertiesOptions> extends Model<O> {
  async didUpdate(property: Property) {
    this.options.didUpdate?.(this, property);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropertyOrProperties = Property<any> | Properties;
