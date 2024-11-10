import { Model, Subscribable } from '../firebase/fire/model.svelte';
import { MapModel } from '../firebase/fire/models.svelte';
import { isLoaded } from '../firebase/fire/utils.svelte';
import type { LayoutModel } from '../layouts/layout.svelte';
import { SiteModel } from '../site/site.svelte';
import { serialized } from '../utils/object';
import { getter, type OptionsInput } from '../utils/options';
import type { PageModel } from './page.svelte';
import { buildPathModel, type PathWithArgs } from './path.svelte';

export type PageRuntimeSettingsModelOptions = {
  page: PageModel | undefined;
  layout: LayoutModel | undefined;
};

export class PageRuntimeSettingsModel extends Model<PageRuntimeSettingsModelOptions> {
  readonly page = $derived(this.options.page?.settings);

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

  readonly __path = $derived(this.options.path);

  readonly _path = new MapModel({
    source: getter(() => this.__path),
    target: (path) => buildPathModel({ path }),
  });

  readonly path = $derived(this._path.content);
  readonly page = $derived(this.path?.page);

  readonly settings = new PageRuntimeSettingsModel({
    page: getter(() => this.page),
    layout: getter(() => this.layout.layout),
  });

  nest(opts: OptionsInput<PageRuntimeNestOptions>) {
    return new PageRuntimeModel({
      parent: this,
      layout: getter(() => this.layout),
      path: opts.path,
    });
  }

  readonly isLoaded = $derived(isLoaded([this.layout, this.path]));
  readonly dependencies = [this._path];
  readonly serialized = $derived(serialized(this, ['path', 'page']));
}
