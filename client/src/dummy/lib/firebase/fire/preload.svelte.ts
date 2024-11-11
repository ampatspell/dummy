import { Deferred } from "./deferred.svelte";
import type { Subscribable } from "./model.svelte";
import { subscribe } from "./subscriber.svelte";

export type PreloadModel = Subscribable<unknown> & {
  isLoaded: boolean;
};

export const preloadModel = <T extends PreloadModel>(model: T): Promise<T> => {
  const deferred = new Deferred<T, unknown>();

  const cancel = $effect.root(() => {
    $effect(() => subscribe(model));
    $effect(() => {
      if(model.isLoaded) {
        onLoaded();
      }
    });
  });

  const onLoaded = () => {
    cancel();
    deferred.resolve(model);
  }

  return deferred.promise;
}
