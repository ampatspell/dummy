import { firebase } from '$lib/firebase/firebase.svelte';
import { getter } from '$lib/utils/options';
import { collection, doc, query, setDoc, where } from '@firebase/firestore';
import { Model } from '$lib/firebase/fire/model.svelte';
import { QueryFirst } from '$lib/firebase/fire/query.svelte';
import { BlocksModel } from './blocks/blocks.svelte';
import type { PageData } from '$lib/utils/types';
import { blockByIdReference } from './blocks/block/reference.svelte';

export type PageModelOptions = {
  identifier: string;
  isEditable: boolean;
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
    if (pageRef) {
      return collection(pageRef, 'blocks');
    }
  });

  blocks = new BlocksModel({
    isEditable: getter(() => this.isEditable),
    collectionRef: getter(() => this._blocksRef),
  });

  block = $derived(blockByIdReference({
    blocks: this.blocks,
    id: this._data?.block,
  }));

  async reset() {
    const res = await this.blocks.reset();
    if (res) {
      const doc = this._doc;
      if (doc) {
        const data = doc.data;
        if (data) {
          data.block = res.block;
          await doc.save();
        }
      }
    }
  }

  isEditable = $derived(this.options.isEditable);
  isLoaded = $derived(this._query.isLoaded && this.blocks.isLoaded);

  dependencies = [this._query, this.blocks];
}

export const createPage = async ({ identifier }: { identifier: string }) => {
  const ref = doc(pagesCollection);
  await setDoc(ref, {
    identifier,
    title: identifier,
  } satisfies PageData);
  return ref;
};
