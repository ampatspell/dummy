import { firebase } from "$lib/firebase/firebase.svelte";
import { getter } from "$lib/utils/options";
import { collection, doc, query, setDoc, where } from "@firebase/firestore";
import type { PageData } from "./data";
import { Model } from "$lib/firebase/fire/model.svelte";
import { QueryFirst } from "$lib/firebase/fire/query.svelte";
import { BlocksModel } from "./blocks.svelte";

export type PageModelOptions = {
  identifier: string;
};

const pagesCollection = collection(firebase.firestore, 'pages');

export class PageModel extends Model<PageModelOptions> {
  identifier = $derived(this.options.identifier);

  __query = $derived.by(() => {
    return query(pagesCollection, where('identifier', '==', this.identifier));
  });

  _query = new QueryFirst<PageData>({
    ref: getter(() => this.__query),
  });

  _doc = $derived(this._query.content);
  _data = $derived(this._doc?.data);

  title = $derived(this._data?.title);

  _blocksRef = $derived.by(() => {
    const pageRef = this._doc?.ref;
    if(pageRef) {
      return collection(pageRef, 'blocks');
    }
  });

  blocks = new BlocksModel({
    collectionRef: getter(() => this._blocksRef),
  });

  dependencies = [this._query, this.blocks];
}

export const createPage = async ({ identifier }: { identifier: string }) => {
  const ref = doc(pagesCollection);
  await setDoc(ref, {
    identifier,
    title: identifier,
  } satisfies PageData);
  return ref;
}

