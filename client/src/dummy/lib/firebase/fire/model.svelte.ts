import { description } from '$dummy/lib/utils/object';
import { options, type OptionsInput } from '$dummy/lib/utils/options';
import { type HasSubscriber, Subscriber } from './subscriber.svelte';

export type HasDescriptionAndSerialized = {
  description?: string;
  serialized?: unknown;
};

export class BaseModel implements HasDescriptionAndSerialized {
  declare readonly serialized?: Record<string, unknown>;
  readonly description = $derived.by(() => description(this, this.serialized));

  toString() {
    return this.description;
  }
}

export class Model<O> extends BaseModel {
  protected readonly options: O;

  constructor(opts: OptionsInput<O>) {
    super();
    this.options = options(opts);
  }
}

export abstract class Subscribable<O> extends Model<O> implements HasSubscriber {
  readonly subscriber: Subscriber;

  constructor(opts: OptionsInput<O>) {
    super(opts);
    this.subscriber = new Subscriber(this);
  }

  readonly isSubscribed = $derived.by(() => this.subscriber.isSubscribed);

  subscribe() {}

  /**
   * Dependencies must be stable
   */
  readonly dependencies: HasSubscriber[] = [];
}
