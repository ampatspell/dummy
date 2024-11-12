import { type SortDescriptors, isTruthy, sortedBy } from '$dummy/lib/utils/array';
import { Subscribable } from './model.svelte';

const ITERATIONS = 10;

export type BaseMapOptions<Source, Target> = {
  target: (source: Source) => Target | undefined;
};

type CacheValue<Target> = {
  target: Target;
  iteration: number;
};

const maybeSubscribeContent = (object: unknown) => {
  if (object instanceof Subscribable) {
    return object.subscriber.subscribe();
  } else {
    return () => {};
  }
};

const maybeSubscribeContentArray = (objects: unknown[]) => {
  const cancels = objects.map((object) => maybeSubscribeContent(object));
  return () => cancels.forEach((c) => c());
};

export abstract class BaseMap<Source, Target, O extends BaseMapOptions<Source, Target>> extends Subscribable<O> {
  _target = $derived(this.options.target);
  _cache: Map<Source, CacheValue<Target>> = new Map();
  _iteration = 0;

  _compact() {
    const cache = this._cache;
    const iteration = this._iteration - ITERATIONS;
    const entries = this._cache.entries();
    for (const [source, value] of entries) {
      if (value.iteration < iteration) {
        cache.delete(source);
      }
    }
  }

  _model(source: Source) {
    return this._target(source);
  }

  _findOrCreate(source: Source) {
    const cache = this._cache;
    const iteration = this._iteration;
    if (cache.has(source)) {
      const value = cache.get(source)!;
      value.iteration = iteration;
      return value.target;
    }
    const target = this._model(source);
    if (target) {
      cache.set(source, {
        target,
        iteration,
      });
    }
    return target;
  }

  _withCache<R>(fn: (findOrCreate: (source: Source) => Target | undefined) => R): R {
    this._iteration++;
    const result = fn((source: Source) => this._findOrCreate(source));
    this._compact();
    return result;
  }

  protected abstract readonly waitForContent: (Target | undefined)[];

  async waitFor(fn: (model: Target) => boolean): Promise<Target> {
    return new Promise<Target>((resolve) => {
      // TODO: timeout
      const cancel = $effect.root(() => {
        $effect(() => {
          const model = this.waitForContent.find((model) => {
            if (model !== undefined) {
              return fn(model);
            }
          });
          if (model) {
            cancel();
            resolve(model);
          }
        });
      });
    });
  }
}

export type MapModelsOptions<Source, Target> = {
  source: Source[];
  sort?: SortDescriptors<Target>;
} & BaseMapOptions<Source, Target>;

export class MapModels<Source extends object, Target> extends BaseMap<
  Source,
  Target,
  MapModelsOptions<Source, Target>
> {
  _source = $derived(this.options.source);
  _content = $state<Target[]>([]);

  readonly content = $derived(this._content);
  protected readonly waitForContent = $derived(this.content);

  readonly sorted = $derived.by(() => {
    const descriptors = this.options.sort;
    const content = this.content;
    if (descriptors) {
      return sortedBy(content, descriptors);
    }
    return content;
  });

  subscribe() {
    return $effect.root(() => {
      $effect(() => {
        const content = this._withCache((findOrCreate) => {
          return this._source.map((source) => findOrCreate(source)).filter(isTruthy);
        });
        this._content = content;
        return maybeSubscribeContentArray(content);
      });
    });
  }
}

export type MapModelOptions<Source, Target> = {
  source: Source | undefined;
} & BaseMapOptions<Source, Target>;

export class MapModel<Source, Target> extends BaseMap<Source, Target, MapModelOptions<Source, Target>> {
  _source = $derived(this.options.source);
  _content = $state<Target>();

  readonly content = $derived(this._content);
  protected readonly waitForContent = $derived([this.content]);

  subscribe() {
    return $effect.root(() => {
      $effect.pre(() => {
        let content: Target | undefined;
        const source = this._source;
        if (source) {
          content = this._withCache((findOrCreate) => findOrCreate(source));
        }
        this._content = content;
        return maybeSubscribeContent(content);
      });
    });
  }
}
