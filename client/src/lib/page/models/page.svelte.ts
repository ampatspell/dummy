import { Model } from '$lib/firebase/fire/model.svelte';
import { QueryFirst } from '$lib/firebase/fire/query.svelte';
import { firebase } from '$lib/firebase/firebase.svelte';
import { createContext } from '$lib/utils/context';
import { getter } from '$lib/utils/options';
import * as fs from '@firebase/firestore';
import type { LayoutModel } from './layout.svelte';
import { update, type UpdateCallback } from '$lib/firebase/fire/document.svelte';
import { serialized } from '$lib/utils/object';
import { BlocksModel } from './blocks/blocks.svelte';

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

export class PageModel extends Model<PageModelOptions> {
  layout = $derived(this.options.layout);

  identifier = $derived(this.options.identifier);

  _query = new QueryFirst<PageData>({
    ref: getter(() => pageByIdentifierQuery(this.identifier)),
  });

  _doc = $derived(this._query.content);
  _data = $derived(this._doc?.data);

  id = $derived(this._doc?.id);
  title = $derived(this._data?.title);
  isLoaded = $derived(this._query.isLoaded);

  blocks = new BlocksModel({
    definition: getter(() => this.layout.blocks),
    collection: getter(() => {
      const ref = this._doc?.ref;
      return ref && fs.collection(ref, 'blocks');
    }),
  });

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

export const createPage = (opts: PageModelOptions) => {
  return setPage(new PageModel(opts));
};
