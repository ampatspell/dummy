import * as fs from '@firebase/firestore';
import type { LayoutData } from '$dummy-shared/documents';
import { Document } from '../firebase/fire/document.svelte';
import { Subscribable } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import { layoutsCollection } from './layouts.svelte';
import { getSiteDefinition } from '../definition/definition.svelte';

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

  readonly definition = $derived.by(() => {
    const id = this.data?.definition;
    if (id) {
      return getSiteDefinition().layouts.layout(id);
    }
  });

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
  const site = getSiteDefinition();
  const { id: definition } = site.layouts.defaults;

  const layout = buildNewLayoutModel({
    data: {
      definition,
    },
  });
  await layout.save();
  return layout;
};