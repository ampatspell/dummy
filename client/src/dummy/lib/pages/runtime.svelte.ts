import { Model, Subscribable } from '../firebase/fire/model.svelte';
import { MapModel } from '../firebase/fire/models.svelte';
import { isLoaded } from '../firebase/fire/utils.svelte';
import { serialized } from '../utils/object';
import { getter, type OptionsInput } from '../utils/options';
import type { PageModel, PageSettingsModel } from './page.svelte';
import { PathModel, urlForPath, type PathWithArgs } from './path.svelte';
import { assertDefined } from '../utils/assert';
import type { LayoutRuntimeModel } from '../layouts/runtime.svelte';

export type PageRuntimeSettingsModelOptions = {
  page: PageModel;
  layout: LayoutRuntimeModel;
};

export class PageRuntimeSettingsModel extends Model<PageRuntimeSettingsModelOptions> {
  readonly page = $derived(this.options.page.settings);

  pageAs<T extends PageSettingsModel>(): T {
    return assertDefined(this.page as T, this, 'pageAs');
  }

  readonly layout = $derived.by(() => {
    const id = this.options.page.definition?.id;
    if (id) {
      return this.options.layout.layout?.pages?.page(id);
    }
  });

  async load() {}
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
    target: (path) => new PathModel({ path }),
  });

  readonly _path = $derived(this.__path.content);
  readonly page = $derived(this._path?.page);

  readonly _settings = new MapModel({
    source: getter(() => ({ page: this.page, layout: this.layout })),
    target: ({ page, layout }) => {
      if (page && layout) {
        return new PageRuntimeSettingsModel({ page, layout });
      }
    },
  });

  readonly settings = $derived(this._settings.content);

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

  readonly isLoaded = $derived(isLoaded([this.layout, this._path, this.page]));
  readonly dependencies = [this.layout, this.__path, this._settings];
  readonly serialized = $derived(serialized(this, ['path', 'args', 'page']));

  async load() {
    await this.layout.load();
    await this.__path.load((model) => model.load());
    await this._settings.load((model) => model.load());
  }
}
