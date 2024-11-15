import * as fs from '@firebase/firestore';
import { Document } from '../firebase/fire/document.svelte';
import { Subscribable } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import { getter } from '../utils/options';
import { data, DocumentModelProperties } from '../utils/property.svelte';
import { pagesCollection } from './pages.svelte';
import { MapModel } from '../firebase/fire/models.svelte';
import { normalizePathBase, urlForPath } from './path.svelte';
import { firebase } from '../firebase/firebase.svelte';
import { httpsCallable } from '@firebase/functions';
import type { FunctionsRecordEventRequest, FunctionsRecordEventResponse } from '$dummy-shared/functions';
import type { PageData } from '$dummy-shared/documents';
import { getSiteDefinition } from '../definition/definition.svelte';
import { isLoaded } from '../firebase/fire/utils.svelte';
import { assertDefined } from '../utils/assert';
import { untrack } from 'svelte';
import { getSession } from '../session/session.svelte';
import type { HasSubscriber } from '../firebase/fire/subscriber.svelte';

class PageProperties extends DocumentModelProperties<PageData> {
  readonly name = data(this, 'name');
  readonly path = data(this, 'path', {
    update: (value) => {
      if (value) {
        return normalizePathBase(value);
      }
      return value;
    },
  });
  readonly definition = data(this, 'definition');
}

export type PageSettingsModelOptions = {
  page: PageModel;
};

export abstract class PageSettingsModel<
  S = Record<string, unknown>,
  O extends PageSettingsModelOptions = PageSettingsModelOptions,
> extends Subscribable<O> {
  readonly page = $derived(this.options.page);
  readonly data = $derived(this.page.data?.settings as S);

  async save() {
    await this.page.save();
  }

  abstract readonly isLoaded: boolean;
}

const pageView = httpsCallable<FunctionsRecordEventRequest, FunctionsRecordEventResponse>(
  firebase.functions,
  'recordEvent',
);

export type PageBaseModelOptions = {
  doc: Document<PageData>;
};

export class PageBaseModel extends Subscribable<PageBaseModelOptions> {
  readonly doc = $derived(this.options.doc);
  readonly id = $derived(this.doc.id!);
  readonly exists = $derived(this.doc.exists);
  readonly data = $derived(this.doc.data);

  readonly name = $derived(this.data?.name);
  readonly path = $derived(this.data?.path);
  readonly views = $derived(this.data?.views);

  readonly _definition = new MapModel({
    source: getter(() => this.data?.definition),
    target: (id) => getSiteDefinition().pages.page(id),
  });

  readonly definition = $derived(this._definition.content);

  readonly url = $derived(this.path && urlForPath(this.path));

  readonly isLoaded = $derived(isLoaded([this.doc]));
  readonly dependencies: HasSubscriber[] = [this.doc];
  readonly serialized = $derived(serialized(this, ['id']));

  static documentForId(id: string) {
    return new Document<PageData>({
      ref: fs.doc(pagesCollection, id),
    });
  }

  static buildById({ id }: { id: string }) {
    return new PageBaseModel({
      doc: PageBaseModel.documentForId(id),
    });
  }
}

export class PageModel extends PageBaseModel {
  readonly _settings = new MapModel({
    source: getter(() => this.definition),
    target: (definition) => definition.page.settings(this),
  });

  readonly settings = $derived(this._settings.content);

  settingsAs<T extends PageSettingsModel>() {
    return assertDefined(this.settings as T, this, 'settingsAs');
  }

  readonly properties = new PageProperties({
    model: this,
  });

  async save() {
    await this.doc.save();
  }

  async delete() {
    await this.doc.delete();
  }

  async onPageView() {
    untrack(async () => {
      const session = await getSession().ready();
      if (session.user?.isAdmin) {
        return;
      }
      await pageView({
        type: 'page-view',
        id: this.id,
      });
    });
  }

  dependencies = [this.doc, this._definition, this._settings];
  readonly serialized = $derived(serialized(this, ['id']));

  static buildNew({ data }: { data: PageData }) {
    return new PageModel({
      doc: new Document<PageData>({
        ref: fs.doc(pagesCollection),
        data,
      }),
    });
  }

  static buildById({ id }: { id: string }) {
    return new PageModel({
      doc: PageBaseModel.documentForId(id),
    });
  }

  static async createNew() {
    const site = getSiteDefinition();
    const {
      id: definition,
      page: { defaults: settings },
    } = site.pages.default;

    const model = PageModel.buildNew({
      data: {
        name: 'New page',
        createdAt: new Date(), // TODO: server timestamp
        path: '/new',
        definition,
        settings,
        views: 0,
      },
    });

    await model.save();
    return model;
  }
}
