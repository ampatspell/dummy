import * as fs from '@firebase/firestore';
import { Document } from '../firebase/fire/document.svelte';
import { Subscribable } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import { getter } from '../utils/options';
import { Properties, Property, type PropertiesOptions } from '../utils/property.svelte';
import { pagesCollection } from './pages.svelte';
import { getPageDefinitions } from './definition/definition.svelte';
import { MapModel } from '../firebase/fire/models.svelte';
import { normalizePathBase, urlForPath } from './path.svelte';
import { firebase } from '../firebase/firebase.svelte';
import { httpsCallable } from '@firebase/functions';
import type { FunctionsRecordEventRequest, FunctionsRecordEventResponse } from '$dummy-shared/functions';
import type { PageData } from '$dummy-shared/documents';

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

  readonly path = new Property<string>({
    delegate: this,
    value: getter(() => this.data.path),
    update: (value) => {
      if (value) {
        value = normalizePathBase(value);
      }
      this.data.path = value;
    },
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

export abstract class PageSettingsModel<S> extends Subscribable<PageSettingsModelOptions> {
  readonly page = $derived(this.options.page);
  readonly data = $derived(this.page.data?.settings as S);

  async save() {
    await this.page.save();
  }

  abstract readonly isLoaded: boolean;
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
  readonly path = $derived(this.data?.path);
  readonly viewCount = $derived(this.data?.viewCount);

  readonly definition = $derived.by(() => {
    const id = this.data?.definition;
    if (id) {
      return getPageDefinitions().page(id);
    }
  });

  readonly _settings = new MapModel({
    source: getter(() => this.definition),
    target: (definition) => definition.settings(this),
  });

  readonly settings = $derived(this._settings.content);

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

  readonly url = $derived(this.path && urlForPath(this.path));

  isLoaded = $derived(this.doc.isLoaded && (this.settings?.isLoaded ?? true));

  async onPageView() {
    const pageView = httpsCallable<FunctionsRecordEventRequest, FunctionsRecordEventResponse>(
      firebase.functions,
      'recordEvent',
    );
    await pageView({
      type: 'page-view',
      id: this.id,
    });
  }

  dependencies = [this.doc, this._settings];

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
      createdAt: new Date(), // TODO: server timestamp
      path: '/new',
      definition,
      settings,
      viewCount: 0,
    },
  });

  await model.save();
  return model;
};
