import type { DocumentData } from '@firebase/firestore';
import type { Document } from '../firebase/fire/document.svelte';
import { Model } from '../firebase/fire/model.svelte';
import { getter, type OptionsInput } from './options';
import type { PromiseVoidCallback } from './types';

export type PropertyDelegateOptions = {
  didUpdate?: <T>(property: Property<T>) => void;
};

export type PropertyOptions<T> = {
  delegate?: PropertyDelegateOptions;
  value: T;
  update: (value: T) => void;
} & PropertyDelegateOptions;

export class Property<T = unknown, O extends PropertyOptions<T> = PropertyOptions<T>> extends Model<O> {
  readonly value = $derived.by(() => this.options.value);

  constructor(opts: OptionsInput<O>) {
    super(opts);
  }

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

export type DocumentModelPropertiesOptions<D extends DocumentData> = {
  model: { doc: Document<D> };
};

export class DocumentModelProperties<
  D extends DocumentData,
  O extends DocumentModelPropertiesOptions<D> = DocumentModelPropertiesOptions<D>,
> extends Model<O> {
  readonly data = $derived(this.options.model.doc.data!);
  async didUpdate() {
    await this.options.model.doc.save();
  }
}

export type DataModelPropertiesOptions<D extends DocumentData> = {
  model: {
    data: D;
    save: PromiseVoidCallback;
  };
};

export class DataModelProperties<
  D extends DocumentData,
  O extends DataModelPropertiesOptions<D> = DataModelPropertiesOptions<D>,
> extends Model<O> {
  readonly data = $derived(this.options.model.data);
  async didUpdate() {
    await this.options.model.save();
  }
}

export type PropertyDelegateWithData<D> = { data: D } & PropertyDelegateOptions;

export const data = <D, K extends keyof D>(
  model: PropertyDelegateWithData<D>,
  key: K,
  opts?: { update?: (value: D[K]) => D[K] },
) => {
  return new Property<D[K]>({
    delegate: model,
    value: getter(() => model.data[key]),
    update: (value: D[K]) => {
      const update = opts?.update;
      if (update) {
        value = update(value);
      }
      model.data[key] = value;
    },
  });
};

export type TransformOptions<IS, IT, RS, RT> = {
  toTarget: (source: IS) => RT;
  toSource: (target: IT) => RS;
};

export const transform = <S, T>(source: Property<S>, { toTarget, toSource }: TransformOptions<S, T, S, T>) => {
  return new Property<T>({
    delegate: getter(() => source.delegate),
    value: getter(() => toTarget(source.value)),
    update: (target) => source.update(toSource(target)),
  });
};

export const optionalTransform = <S, T>(
  source: Property<S | undefined>,
  { toTarget, toSource }: TransformOptions<S, T, S, T | undefined>,
) => {
  return transform<S | undefined, T | undefined>(source, {
    toSource: (value) => {
      if (value) {
        return toSource(value);
      }
    },
    toTarget: (value) => {
      if (value) {
        return toTarget(value);
      }
    },
  });
};

const _integerToString = (number: number | undefined) => {
  if (typeof number === 'number') {
    if (!isNaN(number) && number !== Infinity) {
      return String(number);
    }
  }
  return '';
};

const _stringToInteger = (string: string) => {
  const number = parseInt(string);
  if (!isNaN(number) && number !== Infinity) {
    return number;
  }
  return undefined;
};

export const optionalIntegerToString = (source: Property<number | undefined>): Property<string> =>
  transform(source, {
    toSource: (value) => _stringToInteger(value),
    toTarget: (value) => _integerToString(value),
  });

export const integerToString = (source: Property<number | undefined>, fallback: number) => toRequired(source, fallback);

export const toOptional = <T>(source: Property<T>, fallback: T) =>
  transform<T, T | undefined>(source, {
    toSource: (value) => value ?? fallback,
    toTarget: (value) => value,
  });

export const toRequired = <T>(source: Property<T | undefined>, fallback: T) =>
  transform<T | undefined, T>(source, {
    toSource: (value) => value,
    toTarget: (value) => value ?? fallback,
  });
