import * as fs from '@firebase/firestore';
import type { LayoutData } from '$dummy-shared/documents';
import { Document } from '../firebase/fire/document.svelte';
import { Subscribable } from '../firebase/fire/model.svelte';
import { serialized } from '../utils/object';
import { layoutsCollection } from './layouts.svelte';
import { getSiteDefinition } from '../definition/definition.svelte';
import { Properties, Property, type PropertiesOptions } from '../utils/property.svelte';
import { getter } from '../utils/options';

export type LayoutPropertiesModelOptions = {
  layout: LayoutModel;
} & PropertiesOptions;

export class LayoutPropertiesModel extends Properties<LayoutPropertiesModelOptions> {
  readonly data = $derived(this.options.layout.data!);

  readonly name = new Property<string>({
    delegate: this,
    value: getter(() => this.data.name),
    update: (value) => (this.data.name = value),
  });

  readonly definition = new Property<string>({
    delegate: this,
    value: getter(() => this.data.definition),
    update: (value) => (this.data.definition = value),
  });
}

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

  readonly name = $derived(this.data?.name);

  readonly definition = $derived.by(() => {
    const id = this.data?.definition;
    if (id) {
      return getSiteDefinition().layouts.layout(id);
    }
  });

  readonly properties = new LayoutPropertiesModel({
    layout: this,
    didUpdate: () => this.doc.save(),
  });

  readonly isLoaded = $derived(this.doc.isLoaded);

  async save() {
    await this.doc.save();
  }

  async delete() {
    await this.doc.delete();
  }

  readonly dependencies = [this.doc];
  readonly serialized = $derived(serialized(this, ['id']));
}

export const buildLayoutByIdModel = ({ id }: { id: string }) => {
  return new LayoutModel({
    doc: new Document<LayoutData>({
      ref: fs.doc(layoutsCollection, id),
    }),
  });
};

export const buildNewLayoutModel = ({ data }: { data: LayoutData }) => {
  return new LayoutModel({
    doc: new Document<LayoutData>({
      ref: fs.doc(layoutsCollection),
      data,
    }),
  });
};

export const createNewLayout = async () => {
  const { id: definition, name } = getSiteDefinition().layouts.defaults;

  const layout = buildNewLayoutModel({
    data: {
      definition,
      name,
    },
  });
  await layout.save();
  return layout;
};
