import { untrack } from 'svelte';
import type { FirebaseModel, FirebaseModelOptions } from './firebase.svelte';
import type { HasSubscriber } from './subscriber.svelte';
import { removeObject } from '$dummy/lib/utils/array';
import { setGlobal } from '$dummy/lib/utils/set-global';
import { dev } from '$app/environment';

export class Stats {
  subscribed = $state<HasSubscriber[]>([]);
  listening = $state<FirebaseModel<FirebaseModelOptions>[]>([]);

  _registerSubscribed(model: HasSubscriber) {
    untrack(() => {
      this.subscribed.push(model);
    });
    return () => {
      untrack(() => {
        removeObject(this.subscribed, model);
      });
    };
  }

  _registerListening(model: FirebaseModel<FirebaseModelOptions>) {
    untrack(() => {
      this.listening.push(model);
    });
    return () => {
      untrack(() => {
        removeObject(this.listening, model);
      });
    };
  }

  serialized = $derived.by(() => {
    const { subscribed, listening } = this;
    const map = <T extends object>(arr: T[]) => {
      return arr.map(item => item.toString());
    }
    return {
      subscribed: map(subscribed),
      listening: map(listening),
    }
  });
}

export const stats = new Stats();

if (dev) {
  setGlobal({ stats });
}
