import { doc, setDoc } from '@firebase/firestore';
import type { BlocksModel } from './blocks.svelte';
import type { BlockData, GridBlockData, PlaceholderBlockData, TextBlockData } from '$lib/utils/types';

export const reset = async (blocks: BlocksModel) => {
  const coll = blocks.collectionRef;
  if (!coll) {
    return;
  }

  const query = blocks._query;
  await query.promises.remote;

  await Promise.all(
    query.content.map(async (doc) => {
      await doc.delete();
    }),
  );

  const create = async <T extends BlockData>(data: T) => {
    const ref = doc(coll);
    await setDoc(ref, data);
    console.log(ref.path, data);
    return ref;
  };

  const { id: placeholder } = await create<PlaceholderBlockData>({
    type: 'placeholder',
  });

  const { id: text } = await create<TextBlockData>({
    type: 'text',
    text: 'Hey there',
  });

  const { id: grid } = await create<GridBlockData>({
    type: 'grid',
    columns: [
      {
        value: 1,
        unit: 'fr',
      },
      {
        value: 1,
        unit: 'fr',
      },
    ],
    rows: [
      {
        value: 1,
        unit: 'fr',
      },
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
        block: placeholder,
      },
    ],
  });

  return {
    block: grid,
  };
};
