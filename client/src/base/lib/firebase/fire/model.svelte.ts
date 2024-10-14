import { description } from '$lib/utils/object';
import { options, type OptionsInput } from '$lib/utils/options';

import { type HasSubscriber, Subscriber } from './subscriber.svelte';

export type HasDescriptionAndSerialized = {
  description?: string;
  serialized?: unknown;
};

export abstract class Model<O> implements HasDescriptionAndSerialized, HasSubscriber {
  readonly subscriber: Subscriber;
  readonly options: O;

  constructor(opts: OptionsInput<O>) {
    this.subscriber = new Subscriber(this);
    this.options = options(opts);
  }

  readonly isSubscribed = $derived.by(() => this.subscriber.isSubscribed);

  subscribe() {}

  /**
   * Dependencies must be stable
   */
  readonly dependencies: HasSubscriber[] = [];

  declare readonly serialized?: Record<string, unknown>;
  readonly description = $derived.by(() => description(this, this.serialized));

  toString() {
    return this.description;
  }
}
