import * as fs from '@firebase/firestore';
import { Document } from '../firebase/fire/document.svelte';
import { Subscribable } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import { getter } from '../utils/options';
import { Properties, Property, type PropertiesOptions } from '../utils/property.svelte';
import { pagesCollection } from './pages.svelte';
import { getPageDefinitions } from './definition/definition.svelte';

export type PageData = {
  name: string;
  definition: string;
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

export type PageModelOptions = {
  doc: Document<PageData>;
};

export class PageModel extends Subscribable<PageModelOptions> {
  doc = $derived(this.options.doc);
  id = $derived(this.doc.id!);
  exists = $derived(this.doc.exists);
  data = $derived(this.doc.data);

  name = $derived(this.data?.name);

  definition = $derived.by(() => {
    const id = this.data?.definition;
    if (id) {
      return getPageDefinitions().page(id);
    }
  });

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
