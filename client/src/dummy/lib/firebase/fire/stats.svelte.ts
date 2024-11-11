import { untrack } from 'svelte';
import type { FirebaseModel, FirebaseModelOptions } from './firebase.svelte';
import type { HasSubscriber } from './subscriber.svelte';
import { removeObject } from '$dummy/lib/utils/array';
import { setGlobal } from '$dummy/lib/utils/set-global';
import { dev } from '$app/environment';

export class Stats {
  listening = $state<FirebaseModel<FirebaseModelOptions>[]>([]);
  subscribed = $state<HasSubscriber[]>([]);

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

  serialized = $derived.by(() => {
    const { listening, subscribed } = this;
    const map = <T extends object>(arr: T[]) => arr.map((item) => item.toString());
    return {
      listening: map(listening),
      subscribed: map(subscribed),
    };
  });
}

export const stats = new Stats();

if (dev) {
  setGlobal({ stats });
}
