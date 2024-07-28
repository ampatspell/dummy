import { description } from '$lib/utils/object';
import { options, type OptionsInput } from '$lib/utils/options';

import { type HasSubscriber, Subscriber } from './subscriber.svelte';

export type HasDescriptionAndSerialized = {
  description?: string;
  serialized?: unknown;
};

export abstract class Model<O> implements HasDescriptionAndSerialized, HasSubscriber {
  subscriber: Subscriber;
  options: O;

  constructor(opts: OptionsInput<O>) {
    this.subscriber = new Subscriber(this);
    this.options = options(opts);
  }

  isSubscribed = $derived.by(() => this.subscriber.isSubscribed);

  subscribe() {}

  /**
   * Dependencies must be stable
   */
  dependencies: HasSubscriber[] = [];

  declare serialized?: Record<string, unknown>;
  description = $derived.by(() => description(this, this.serialized));

  toString() {
    return this.description;
  }
}
