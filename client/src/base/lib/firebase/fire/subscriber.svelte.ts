import { tick, untrack } from 'svelte';
import { stats } from './stats.svelte';
import type { VoidCallback } from '$lib/utils/types';

export type HasSubscriber = {
  subscriber: Subscriber;
  subscribe(): (() => void) | void;
  dependencies?: HasSubscriber[];
};

export class Subscriber {
  _model: HasSubscriber;
  _subscribers = 0;
  _cancel = $state<VoidCallback>();

  isSubscribed = $derived(!!this._cancel);

  constructor(model: HasSubscriber) {
    this._model = model;
  }

  get _dependencies() {
    return this._model.dependencies ?? [];
  }

  _subscribe() {
    const children = this._dependencies.map((child) => child.subscriber.subscribe());
    const model = this._model.subscribe();
    const stat = stats._registerSubscribed(this._model);
    return () => {
      model?.();
      children.forEach((child) => child());
      stat();
    };
  }

  _maybeSubscribe() {
    if (this._subscribers++ === 0) {
      this._cancel = this._subscribe();
    }
  }

  async _maybeCancel() {
    await tick();
    if (--this._subscribers === 0) {
      this._cancel!();
      this._cancel = undefined;
    }
  }

  subscribe() {
    this._maybeSubscribe();
    return () => {
      this._maybeCancel();
    };
  }
}

export const subscribe = (model: HasSubscriber) => {
  return untrack(() => model.subscriber.subscribe());
};
