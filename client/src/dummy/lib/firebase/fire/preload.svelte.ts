import { Deferred } from './deferred.svelte';
import type { Subscribable } from './model.svelte';
import { subscribe } from './subscriber.svelte';

export type PreloadModel = Subscribable<unknown> & {
  isLoaded: boolean;
};

export const preloadModel = <T extends PreloadModel>(model: T, isLoaded?: () => boolean | undefined): Promise<T> => {
  isLoaded = isLoaded ?? (() => true);

  const deferred = new Deferred<T, unknown>();

  const cancel = $effect.root(() => {
    $effect(() => subscribe(model));
    $effect(() => {
      if (model.isLoaded && isLoaded() !== false) {
        onLoaded();
      }
    });
  });

  const onLoaded = () => {
    cancel();
    deferred.resolve(model);
  };

  return deferred.promise;
};
