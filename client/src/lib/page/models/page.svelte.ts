import { Model } from '$lib/firebase/fire/model.svelte';
import { QueryFirst } from '$lib/firebase/fire/query.svelte';
import { firebase } from '$lib/firebase/firebase.svelte';
import { createContext } from '$lib/utils/context';
import { getter } from '$lib/utils/options';
import { collection, query, where } from '@firebase/firestore';
import type { LayoutModel } from './layout.svelte';
import { update, type UpdateCallback } from '$lib/firebase/fire/document.svelte';
import { serialized } from '$lib/utils/object';

const pagesCollection = collection(firebase.firestore, 'pages');
const pageByIdentifierQuery = (identifier: string) => query(pagesCollection, where('identifier', '==', identifier));

export type PageData = {
  title: string;
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
  isLoaded = $derived(this._query.isLoaded);

  update = (cb: UpdateCallback<PageData>) => update(this._doc, cb);

  title = $derived(this._data?.title);

  dependencies = [this._query];
  serialized = $derived(serialized(this, ['id', 'identifier', 'isLoaded']));
}

const { get: getPage, set: setPage } = createContext<PageModel>('page');

export { getPage };

export const createPage = (opts: PageModelOptions) => {
  return setPage(new PageModel(opts));
};
