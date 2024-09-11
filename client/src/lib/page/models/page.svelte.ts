import { firebase } from '$lib/firebase/firebase.svelte';
import { getter } from '$lib/utils/options';
import { collection, doc, query, setDoc, where } from '@firebase/firestore';
import { Model } from '$lib/firebase/fire/model.svelte';
import { QueryFirst } from '$lib/firebase/fire/query.svelte';
import { BlocksModel } from './blocks/blocks.svelte';
import type { BlockType, PageData } from '$lib/utils/types';
import { blockByIdReference } from './blocks/block/reference.svelte';
import type { BlockModel } from './blocks/block/block.svelte';
import { Property } from '$lib/utils/property.svelte';

class PageModelProperties {
  page: PageModel;

  constructor(page: PageModel) {
    this.page = page;
  }

  delegate = {};

  title = new Property({
    delegate: this.delegate,
    value: getter(() => this.page.title),
    update: (value) => this.page.update((data) => (data.title = value)),
  });
}

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

  id = $derived(this._doc?.id);
  title = $derived(this._data?.title);

  update(cb: (data: PageData) => void) {
    const data = this._data;
    if (data) {
      cb(data);
      this._doc!.scheduleSave();
    }
  }

  properties = new PageModelProperties(this);

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

  block = $derived(
    blockByIdReference({
      blocks: this.blocks,
      id: this._data?.block,
    }),
  );

  async replaceWith(type: BlockType) {
    const model = await this.blocks.createNew(type);
    if (model) {
      this.update((data) => {
        data.block = model.id;
      });
    }
  }

  selected: BlockModel | PageModel = $derived(this.blocks.selected ?? this);

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
