import { untrack } from 'svelte';
import type { FirebaseModel, FirebaseModelOptions } from './firebase.svelte';
import type { HasSubscriber } from './subscriber.svelte';
import { removeObject } from '$dummy/lib/utils/array';

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
}

export const stats = new Stats();
