import { Model } from '$lib/firebase/fire/model.svelte';
import { QueryFirst } from '$lib/firebase/fire/query.svelte';
import { firebase } from '$lib/firebase/firebase.svelte';
import { createContext } from '$lib/utils/context';
import { getter, type OptionsInput } from '$lib/utils/options';
import * as fs from '@firebase/firestore';
import type { LayoutModel } from '../../layout/models/layout.svelte';
import { update, type UpdateCallback } from '$lib/firebase/fire/document.svelte';
import { serialized } from '$lib/utils/object';
import { BlocksModel } from '$lib/components/blocks/models/blocks.svelte';
import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
import { Property } from '$lib/utils/property.svelte';

const pagesCollection = fs.collection(firebase.firestore, 'pages');

const pageByIdentifierQuery = (identifier: string) => {
  return fs.query(pagesCollection, fs.where('identifier', '==', identifier));
};

export type PageData = {
  identifier: string;
  title: string;
  block?: string;
};

export type PageModelOptions = {
  layout: LayoutModel;
  identifier: string;
};

export class PageModelProperties {
  constructor(private readonly page: PageModel) {}

  isDisabled = $derived.by(() => this.page.isEditing);

  identifier = new Property<string | undefined>({
    delegate: this,
    value: getter(() => this.page.identifier),
    update: (value?: string) => {
      this.page.update((data) => {
        data.identifier = value ?? '';
      });
    },
  });

  title = new Property<string | undefined>({
    delegate: this,
    value: getter(() => this.page.title),
    update: (value?: string) => {
      this.page.update((data) => {
        data.title = value ?? '';
      });
    },
  });
}

export class PageModel extends Model<PageModelOptions> {
  layout = $derived(this.options.layout);
  isEditing = $derived(this.layout.isEditing);

  identifier = $derived(this.options.identifier);

  _query = new QueryFirst<PageData>({
    ref: getter(() => pageByIdentifierQuery(this.identifier)),
  });

  _doc = $derived(this._query.content);
  _data = $derived(this._doc?.data);

  id = $derived(this._doc?.id);
  title = $derived(this._data?.title);

  properties = new PageModelProperties(this);

  blocks = new BlocksModel({
    isEditing: getter(() => this.isEditing),
    definition: getter(() => this.layout.blocks),
    collection: getter(() => {
      const ref = this._doc?.ref;
      return ref && fs.collection(ref, 'blocks');
    }),
  });

  selected: PageModel | BlockModel = $derived(this.blocks.selected ?? this);

  isLoaded = $derived(this._query.isLoaded && this.blocks.isLoaded);

  block = $derived.by(() => {
    const id = this._data?.block;
    return id && this.blocks.byId(id);
  });

  update = (cb: UpdateCallback<PageData>) => update(this._doc, cb);

  dependencies = [this._query, this.blocks];
  serialized = $derived(serialized(this, ['id', 'identifier', 'isLoaded']));
}

const { get: getPage, set: setPage } = createContext<PageModel>('page');

export { getPage };

export const createPage = (opts: OptionsInput<PageModelOptions>) => {
  return setPage(new PageModel(opts));
};
