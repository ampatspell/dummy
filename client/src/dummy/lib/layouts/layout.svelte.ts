import * as fs from '@firebase/firestore';
import type { LayoutData } from '$dummy-shared/documents';
import { Document } from '../firebase/fire/document.svelte';
import { Subscribable } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import { layoutsCollection } from './layouts.svelte';
import { getSiteDefinition } from '../definition/definition.svelte';
import { Properties, Property, type PropertiesOptions } from '../utils/property.svelte';
import { getter } from '../utils/options';
import { MapModel, MapModels } from '../firebase/fire/models.svelte';
import { isLoaded } from '../firebase/fire/utils.svelte';
import type { PageDefinitionModel } from '../definition/pages.svelte';

export type LayoutSettingsModelOptions = {
  layout: LayoutModel;
};

export abstract class LayoutSettingsModel<S> extends Subscribable<LayoutSettingsModelOptions> {
  get layout() {
    return this.options.layout;
  }

  readonly data = $derived(this.layout.data?.settings.layout as S);

  async save() {
    await this.layout.save();
  }

  abstract readonly isLoaded: boolean;
}

export type LayoutPageSettingsModelOptions = {
  page: LayoutPageModel;
};

export abstract class LayoutPageSettingsModel<S> extends Subscribable<LayoutPageSettingsModelOptions> {
  readonly page = $derived(this.options.page);
  readonly data = $derived(this.page.data as S);

  async save() {
    await this.page.save();
  }

  abstract readonly isLoaded: boolean;
}

export type LayoutPropertiesModelOptions = {
  layout: LayoutModel;
} & PropertiesOptions;

export class LayoutPropertiesModel extends Properties<LayoutPropertiesModelOptions> {
  readonly data = $derived(this.options.layout.data!);

  readonly name = new Property<string>({
    delegate: this,
    value: getter(() => this.data.name),
    update: (value) => (this.data.name = value),
  });

  readonly definition = new Property<string>({
    delegate: this,
    value: getter(() => this.data.definition),
    update: (value) => (this.data.definition = value),
  });
}

export type LayoutPageModelOptions = {
  pages: LayoutPagesModel;
  definition: PageDefinitionModel;
};

export class LayoutPageModel extends Subscribable<LayoutPageModelOptions> {
  pages = $derived(this.options.pages);
  layout = $derived(this.pages.layout);
  definition = $derived(this.options.definition);
  id = $derived(this.definition.id);

  _data = $derived(this.layout.data?.settings.pages[this.id]);
  data = $derived(this._data ?? {});

  async prepare() {
    await this.layout.maybePrepare(this);
  }

  settings = $derived(this.definition.layout.settings(this));

  async save() {
    await this.pages.save();
  }

  dependencies = [this.settings];
  isLoaded = $derived(this.settings.isLoaded);
  serialized = $derived(serialized(this, ['id']));
}

export type LayoutPagesModelOptions = {
  layout: LayoutModel;
};

export class LayoutPagesModel extends Subscribable<LayoutPagesModelOptions> {
  get layout() {
    return this.options.layout;
  }

  readonly _all = new MapModels({
    source: getter(() => getSiteDefinition().pages.withLayout),
    target: (definition) => new LayoutPageModel({ definition, pages: this }),
  });

  readonly all = $derived(this._all.content);

  async save() {
    await this.layout.save();
  }

  isLoaded = $derived(isLoaded(this.all));
  dependencies = [this._all];
}

export type LayoutModelOptions = {
  doc: Document<LayoutData>;
};

export class LayoutModel extends Subscribable<LayoutModelOptions> {
  readonly doc = $derived(this.options.doc);
  readonly id = $derived(this.doc.id!);
  readonly ref = $derived(this.doc.ref!);
  readonly path = $derived(this.doc.path!);
  readonly data = $derived(this.doc.data);
  readonly exists = $derived(this.doc.exists);

  readonly name = $derived(this.data?.name);

  readonly definition = $derived.by(() => {
    const id = this.data?.definition;
    if (id) {
      return getSiteDefinition().layouts.layout(id);
    }
  });

  readonly properties = new LayoutPropertiesModel({
    layout: this,
    didUpdate: () => this.doc.save(),
  });

  readonly _settings = new MapModel({
    source: getter(() => this.definition),
    target: (definition) => definition.settings(this),
  });

  readonly settings = $derived(this._settings.content);

  readonly _pages = new MapModel({
    source: getter(() => this.definition),
    target: () => new LayoutPagesModel({ layout: this }),
  });

  readonly pages = $derived(this._pages.content);

  async save() {
    await this.doc.save();
  }

  async delete() {
    await this.doc.delete();
  }

  async maybePrepare(page: LayoutPageModel) {
    if (this.isLoaded) {
      const data = this.data!;
      const id = page.id;
      if (!data.settings.pages[id]) {
        data.settings.pages[id] = {};
        await this.save();
      }
    }
  }

  readonly isLoaded = $derived(isLoaded([this.doc, this.settings, this.pages]));
  readonly dependencies = [this.doc, this._settings, this._pages];
  readonly serialized = $derived(serialized(this, ['id']));
}

export const buildLayoutByIdModel = ({ id }: { id: string }) => {
  return new LayoutModel({
    doc: new Document<LayoutData>({
      ref: fs.doc(layoutsCollection, id),
    }),
  });
};

export const buildNewLayoutModel = ({ data }: { data: LayoutData }) => {
  return new LayoutModel({
    doc: new Document<LayoutData>({
      ref: fs.doc(layoutsCollection),
      data,
    }),
  });
};

export const createNewLayout = async () => {
  const { definition, name, settings } = getSiteDefinition().layouts.defaults;

  const layout = buildNewLayoutModel({
    data: {
      definition,
      name,
      settings,
    },
  });
  await layout.save();
  return layout;
};
