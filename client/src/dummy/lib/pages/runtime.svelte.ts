import { getContext, setContext } from 'svelte';
import { Model, Subscribable } from '../firebase/fire/model.svelte';
import { MapModel } from '../firebase/fire/models.svelte';
import { isLoaded } from '../firebase/fire/utils.svelte';
import type { LayoutModel } from '../layouts/layout.svelte';
import { SiteModel } from '../site/site.svelte';
import { serialized } from '../utils/object';
import { getter, type OptionsInput } from '../utils/options';
import type { PageModel, PageSettingsModel } from './page.svelte';
import { buildPathModel, urlForPath, type PathWithArgs } from './path.svelte';
import { assertDefined } from '../utils/assert';

export type PageRuntimeSettingsModelOptions = {
  page: PageModel | undefined;
  layout: LayoutModel | undefined;
};

export class PageRuntimeSettingsModel extends Model<PageRuntimeSettingsModelOptions> {
  readonly page = $derived(this.options.page?.settings);

  pageAs<T extends PageSettingsModel>(): T {
    return assertDefined(this.page as T, this, 'pageAs');
  }

  readonly layout = $derived.by(() => {
    const id = this.options.page?.definition?.id;
    if (id) {
      return this.options.layout?.pages?.page(id);
    }
  });
}

export type LayoutRuntimeModelOptions = {
  site: SiteModel;
};

export class LayoutRuntimeModel extends Subscribable<LayoutRuntimeModelOptions> {
  readonly site = $derived(this.options.site);
  readonly layout = $derived(this.site.layout);
  readonly definition = $derived(this.layout?.definition);

  readonly isLoaded = $derived(isLoaded([this.site]));
  readonly dependencies = [this.site];
}

export type PageRuntimeModelOptions = {
  layout: LayoutRuntimeModel;
  parent?: PageRuntimeModel;
  path: PathWithArgs | undefined;
};

export type PageRuntimeNestOptions = {
  path: PathWithArgs | undefined;
};

export class PageRuntimeModel extends Subscribable<PageRuntimeModelOptions> {
  readonly layout = $derived(this.options.layout);
  readonly parent = $derived(this.options.parent);

  readonly path = $derived(this.options.path?.path);
  readonly args = $derived(this.options.path?.args ?? []);

  readonly __path = new MapModel({
    source: getter(() => this.options.path),
    target: (path) => buildPathModel({ path }),
  });

  readonly _path = $derived(this.__path.content);
  readonly page = $derived(this._path?.page);

  readonly settings = new PageRuntimeSettingsModel({
    page: getter(() => this.page),
    layout: getter(() => this.layout.layout),
  });

  urlFor(path: string, args?: string[]) {
    return urlForPath(path, args);
  }

  urlForArgs(...args: string[]) {
    const path = this.path;
    if (path) {
      return this.urlFor(path, args);
    }
  }

  nest(opts: OptionsInput<PageRuntimeNestOptions>) {
    return new PageRuntimeModel({
      parent: this,
      layout: getter(() => this.layout),
      path: opts.path,
    });
  }

  readonly isLoaded = $derived(isLoaded([this.layout, this._path, this.page?.settings]));
  readonly dependencies = [this.__path];
  readonly serialized = $derived(serialized(this, ['path', 'args', 'page']));
}

const KEY = 'page-runtime';

export const createPageRuntimeContext = (runtime: PageRuntimeModel) => {
  return setContext(KEY, runtime);
};

export const getPageRuntimeContext = () => {
  return getContext(KEY) as PageRuntimeModel;
};
