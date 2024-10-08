import { Model } from "$lib/firebase/fire/model.svelte";
import { QueryFirst } from "$lib/firebase/fire/query.svelte";
import { firebase } from "$lib/firebase/firebase.svelte";
import { createContext } from "$lib/utils/context";
import { getter } from "$lib/utils/options";
import { collection, query, where } from "@firebase/firestore";
import type { LayoutModel } from "./layout.svelte";

const pagesCollection = collection(firebase.firestore, 'pages');

export type PageData = {
  title: string;
};

export type PageModelOptions = {
  layout: LayoutModel;
  identifier: string;
};

export class PageModel extends Model<PageModelOptions> {
  identifier = $derived(this.options.identifier);

  _query = new QueryFirst<PageData>({
    ref: getter(() => {
      return query(pagesCollection, where('identifier', '==', this.identifier));
    }),
  });

  _doc = $derived(this._query.content);
  _data = $derived(this._doc?.data);

  id = $derived(this._doc?.id);
  title = $derived(this._data?.title);

  update(cb: (data: PageData) => void) {
    const data = this._data;
    if (data) {
      cb(data);
      this._doc!.scheduleSave();
    }
  }

  dependencies = [this._query];

  isLoaded = $derived(this._query.isLoaded);
}

const { get: getPage, set: setPage } = createContext<PageModel>('page');

export {
  getPage
};

export const createPage = (opts: PageModelOptions) => {
  return setPage(new PageModel(opts));
}
