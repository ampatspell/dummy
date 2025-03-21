import { browser, dev } from '$app/environment';
import { scope } from '$dummy/lib/utils/scope';
import { Deferred } from './deferred.svelte';
import type { Subscribable } from './model.svelte';
import { subscribe } from './subscriber.svelte';

export type PreloadModel = Subscribable<unknown> & {
  isLoaded: boolean;
  load?: () => Promise<void>;
};

export const preloadModel = <T extends PreloadModel>(model: T, isLoaded?: () => boolean | undefined): Promise<T> => {
  isLoaded = isLoaded ?? (() => true);

  const deferred = new Deferred<T, unknown>();

  if(browser) {
    const cancel = $effect.root(() => {
      $effect(() => subscribe(model));
      $effect(() => {
        // TODO: something is off with reactivity here
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        model.isLoaded;
        if (model.isLoaded && isLoaded() !== false) {
          onLoaded();
        }
      });
    });

    const onLoaded = () => {
      cancel();
      deferred.resolve(model);
    };
  } else {
    const log = (...args: unknown[]) => {
      if(dev) {
        console.log(...args);
      }
    }
    scope(async () => {
      if(model.load) {
        await model.load();
        if(!model.isLoaded) {
          log(model+'', 'insufficient load');
        }
      } else {
        log(model+'', 'missing load');
      }
      deferred.resolve(model);
    });
  }

  return deferred.promise;
};
