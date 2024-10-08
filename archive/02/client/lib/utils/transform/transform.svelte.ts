import { action } from '../action';
import { options, type OptionsInput } from '../options';

class Invalid {}
export const invalid = new Invalid();

const isInvalid = (arg: unknown): arg is Invalid => {
  return arg instanceof Invalid;
};

export type TransformerOptions<I, O> = {
  value: I;
  update: (value: I) => void;
  target: Target<I, O>;
};

export class TargetRuntime<I, O> {
  private readonly transformer: Transformer<I, O>;

  constructor(transformer: Transformer<I, O>) {
    this.transformer = transformer;
  }

  target = $derived.by(() => this.transformer.options.target);

  value = $derived.by(() => {
    return this.target.toTarget(this.transformer.value);
  });

  @action
  update(value: O) {
    const source = this.target.toSource(value);
    if (!isInvalid(source)) {
      this.transformer.update(source);
    }
  }
}

export class Transformer<I, O> {
  readonly options: TransformerOptions<I, O>;
  readonly target: TargetRuntime<I, O>;

  constructor(opts: OptionsInput<TransformerOptions<I, O>>) {
    this.options = options(opts);
    this.target = new TargetRuntime(this);
  }

  value = $derived.by(() => this.options.value);

  @action
  update(value: I) {
    this.options.update(value);
  }
}

export abstract class Target<I, O> {
  abstract toTarget(value: I): O;
  abstract toSource(value: O): I | Invalid;
}
