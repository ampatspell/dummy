import * as fs from '@firebase/firestore';
import { Document } from '../firebase/fire/document.svelte';
import { Model, Subscribable } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import { getter } from '../utils/options';
import { Properties, Property, type PropertiesOptions } from '../utils/property.svelte';
import { pagesCollection } from './pages.svelte';
import { getPageDefinitions } from './definition/definition.svelte';

export type PageData = {
  name: string;
  definition: string;
  settings: Record<string, unknown>;
};

export type PagePropertiesOptions = {
  page: PageModel;
} & PropertiesOptions;

class PageProperties extends Properties<PagePropertiesOptions> {
  private page = $derived(this.options.page);
  private data = $derived(this.page.data!);

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

export type PageSettingsModelOptions = {
  page: PageModel;
};

export class PageSettingsModel<S> extends Model<PageSettingsModelOptions> {
  readonly page = $derived(this.options.page);
  readonly data = $derived(this.page.data?.settings as S);

  async save() {
    await this.page.save();
  }
}

export type PageModelOptions = {
  doc: Document<PageData>;
};

export class PageModel extends Subscribable<PageModelOptions> {
  readonly doc = $derived(this.options.doc);
  readonly id = $derived(this.doc.id!);
  readonly exists = $derived(this.doc.exists);
  readonly data = $derived(this.doc.data);

  readonly name = $derived(this.data?.name);

  readonly definition = $derived.by(() => {
    const id = this.data?.definition;
    if (id) {
      return getPageDefinitions().page(id);
    }
  });

  readonly settings = $derived(this.definition?.settings(this));

  readonly properties = new PageProperties({
    didUpdate: () => this.doc.save(),
    page: this,
  });

  async save() {
    await this.doc.save();
  }

  async delete() {
    await this.doc.delete();
  }

  isLoaded = $derived(this.doc.isLoaded);

  dependencies = [this.doc];

  readonly serialized = $derived(serialized(this, ['id']));
}

export type NewPageModelOptions = {
  data: PageData;
};

export const buildNewPageModel = ({ data }: NewPageModelOptions) => {
  return new PageModel({
    doc: new Document<PageData>({
      ref: fs.doc(pagesCollection),
      data,
    }),
  });
};

export const buildPageByIdModel = ({ id }: { id: string }) => {
  return new PageModel({
    doc: new Document<PageData>({
      ref: fs.doc(pagesCollection, id),
    }),
  });
};

export const createNewPage = async () => {
  const {
    defaults: { id: definition, settings },
  } = getPageDefinitions();

  const model = buildNewPageModel({
    data: {
      name: 'New page',
      definition,
      settings,
    },
  });

  await model.save();
  return model;
};
