import type { Component } from 'svelte';
import type { PageModel, PageSettingsModel } from '../pages/page.svelte';
import { Model } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import { getter } from '../utils/options';
import type { LayoutPageModel, LayoutPageSettingsModel } from '../layouts/layout.svelte';
import type { PageRuntimeModel } from '../pages/runtime.svelte';

export type PageComponent = Component<{ page: PageModel }>;
export type PageFrontendComponent = Component<{ runtime: PageRuntimeModel }>;
export type LayoutPageComponent = Component<{ page: LayoutPageModel }>;

export type PageSettings = Record<string, unknown>;
export type LayoutSettings = Record<string, unknown>;

export type PageDefinitionModelOptions<
  PS extends PageSettings = PageSettings,
  LS extends LayoutSettings = LayoutSettings,
> = {
  id: string;
  name: string;
  page: {
    frontend: PageFrontendComponent;
    backend: PageComponent;
    settings: (page: PageModel) => PageSettingsModel<PS>;
    defaults: PS;
  };
  layout?: {
    backend: LayoutPageComponent;
    settings: (layout: LayoutPageModel) => LayoutPageSettingsModel<LS>;
  };
};

export type PageDefinitionPageModelOptions<
  PS extends PageSettings = PageSettings,
  LS extends LayoutSettings = LayoutSettings,
> = {
  page: PageDefinitionModelOptions<PS, LS>['page'];
};

export class PageDefinitionPageModel<PS extends PageSettings = PageSettings> extends Model<
  PageDefinitionPageModelOptions<PS>
> {
  readonly frontend = $derived(this.options.page.frontend);
  readonly defaults = $derived(this.options.page.defaults);
  readonly backend = $derived(this.options.page.backend);

  settings(page: PageModel) {
    return this.options.page.settings(page);
  }
}

export type PageDefinitionLayoutModelOptions<
  PS extends PageSettings = PageSettings,
  LS extends LayoutSettings = LayoutSettings,
> = {
  layout: PageDefinitionModelOptions<PS, LS>['layout'];
};

export class PageDefinitionLayoutModel<
  PS extends PageSettings = PageSettings,
  LS extends LayoutSettings = LayoutSettings,
> extends Model<PageDefinitionLayoutModelOptions<PS, LS>> {
  readonly exists = $derived(!!this.options.layout);
  readonly backend = $derived(this.options.layout?.backend);

  settings(page: LayoutPageModel) {
    return this.options.layout!.settings(page);
  }
}

export class PageDefinitionModel<
  PS extends PageSettings = PageSettings,
  LS extends LayoutSettings = LayoutSettings,
> extends Model<PageDefinitionModelOptions<PS, LS>> {
  readonly id = $derived(this.options.id);
  readonly name = $derived(this.options.name);

  readonly page = new PageDefinitionPageModel<PS>({
    page: getter(() => this.options.page),
  });

  readonly layout = new PageDefinitionLayoutModel<PS>({
    layout: getter(() => this.options.layout),
  });

  readonly serialized = $derived(serialized(this, ['id']));
}

export type PageDefinitionsModelOptions = {
  definitions: PageDefinitionModelOptions[];
};

export class PageDefinitionsModel extends Model<PageDefinitionsModelOptions> {
  readonly definitions = $derived(this.options.definitions.map((opts) => new PageDefinitionModel(opts)));
  readonly withLayout = $derived(this.definitions.filter((definition) => definition.layout.exists));

  page(id: string) {
    return this.definitions.find((page) => page.id === id);
  }

  readonly default = $derived(this.definitions[0]!);
}
