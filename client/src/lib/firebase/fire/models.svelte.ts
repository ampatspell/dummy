import { isTruthy } from '$lib/utils/array';

import { Model } from './model.svelte';

const ITERATIONS = 10;

export type BaseMapOptions<Source, Target> = {
  target: (source: Source) => Target | undefined;
};

type CacheValue<Target> = {
  target: Target;
  iteration: number;
};

export class BaseMap<Source extends object, Target, O extends BaseMapOptions<Source, Target>> extends Model<O> {
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
}

export type MapModelsOptions<Source, Target> = {
  source: Source[];
} & BaseMapOptions<Source, Target>;

export class MapModels<Source extends object, Target> extends BaseMap<
  Source,
  Target,
  MapModelsOptions<Source, Target>
> {
  _source = $derived(this.options.source);

  content = $derived.by(() => {
    return this._withCache((findOrCreate) => {
      return this._source.map((source) => findOrCreate(source)).filter(isTruthy);
    });
  });

  async waitFor(fn: (model: Target) => boolean): Promise<Target> {
    return new Promise<Target>((resolve) => {
      // TODO: timeout
      const cancel = $effect.root(() => {
        $effect(() => {
          const model = this.content.find(fn);
          if (model) {
            cancel();
            resolve(model);
          }
        });
      });
    });
  }
}

export type MapModelOptions<Source, Target> = {
  source: Source | undefined;
} & BaseMapOptions<Source, Target>;

export class MapModel<Source extends object, Target> extends BaseMap<Source, Target, MapModelOptions<Source, Target>> {
  _source = $derived(this.options.source);

  content = $derived.by(() => {
    const source = this._source;
    if (source) {
      return this._withCache((findOrCreate) => {
        return findOrCreate(source);
      });
    }
  });
}
