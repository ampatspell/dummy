import * as fs from '@firebase/firestore';
import type { LayoutData } from '$dummy-shared/documents';
import { Document } from '../firebase/fire/document.svelte';
import { Subscribable } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import { layoutsCollection } from './layouts.svelte';

export type LayoutModelOptions = {
  doc: Document<LayoutData>;
};

export class LayoutModel extends Subscribable<LayoutModelOptions> {
  readonly doc = $derived(this.options.doc);
  readonly id = $derived(this.doc.id!);
  readonly ref = $derived(this.doc.ref!);
  readonly path = $derived(this.doc.path!);
  readonly data = $derived(this.doc.data);
  readonly exists = $derived(this.doc.exists);

  async save() {
    await this.doc.save();
  }

  readonly dependencies = [this.doc];
  readonly serialized = $derived(serialized(this, ['id']));
}

export const buildNewLayoutModel = ({ data }: { data: LayoutData }) => {
  return new LayoutModel({
    doc: new Document<LayoutData>({
      ref: fs.doc(layoutsCollection),
      data,
    }),
  });
};

export const createNewLayout = async () => {
  const layout = buildNewLayoutModel({
    data: {
      definition: 'default',
    },
  });
  await layout.save();
  return layout;
};
