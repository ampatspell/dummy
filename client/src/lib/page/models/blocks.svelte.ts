import { Model } from "$lib/firebase/fire/model.svelte";
import { QueryAll } from "$lib/firebase/fire/query.svelte";
import { getter } from "$lib/utils/options";
import { doc, setDoc, type CollectionReference } from "@firebase/firestore";
import { type BlockData, type GridBlockData, type PlaceholderBlockData, type TextBlockData } from "./data";

export type BlocksModelOptions = {
  collectionRef: CollectionReference | undefined;
};

export class BlocksModel extends Model<BlocksModelOptions> {
  collectionRef = $derived(this.options.collectionRef);

  _query = new QueryAll({
    ref: getter(() => this.collectionRef),
  });

  docs = $derived(this._query.content);

  dependencies = [this._query];

  //

  async reset() {
    const coll = this.collectionRef;
    if(!coll) {
      return;
    }

    await this._query.promises.remote;

    await Promise.all(this.docs.map(async doc => {
      await doc.delete();
    }));

    const create = async <T extends BlockData>(data: T) => {
      const ref = doc(coll);
      await setDoc(ref, data);
      console.log(ref.path, data);
      return ref;
    }

    const { id: placeholder } = await create<PlaceholderBlockData>({
      type: 'placeholder',
    });

    const { id: text } = await create<TextBlockData>({
      type: 'text',
      text: 'Hey there',
    });

    await create<GridBlockData>({
      type: 'grid',
      columns: [
        {
          value: 1, unit: 'fr',
        },
        {
          value: 1, unit: 'fr',
        }
      ],
      rows: [
        {
          value: 1, unit: 'fr',
        }
      ],
      areas: [
        {
          placement: {
            start: { column: 1, row: 1 },
            end: { column: 1, row: 1 },
          },
          block: text,
        },
        {
          placement: {
            start: { column: 2, row: 1 },
            end: { column: 2, row: 1 },
          },
          block: placeholder
        }
      ]
    });
  }
}

