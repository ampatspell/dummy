import { Model } from '../firebase/fire/model.svelte';
import { Document } from '../firebase/fire/document.svelte';
import * as fs from '@firebase/firestore';
import { serialized } from '../utils/object';
import { Properties, Property, type PropertiesOptions } from '../utils/property.svelte';
import { getter } from '../utils/options';
import { galleriesCollection, GalleriesModel } from './galleries.svelte';

export type GalleryData = {
  name: string;
};

export type GalleryModelOptions = {
  doc: Document<GalleryData>;
};

export type GalleryPropertiesOptions = {
  gallery: GalleryModel;
} & PropertiesOptions;

class GalleryProperties extends Properties<GalleryPropertiesOptions> {
  private gallery = $derived(this.options.gallery);
  private data = $derived(this.gallery.data!);

  readonly name = new Property<string>({
    delegate: this,
    label: 'Name',
    value: getter(() => this.data.name),
    update: (value) => (this.data.name = value),
  });

  readonly all = $derived([this.name]);
}

export class GalleryModel extends Model<GalleryModelOptions> {
  readonly doc = $derived(this.options.doc);
  readonly id = $derived(this.doc.id);
  readonly data = $derived(this.doc.data);
  readonly exists = $derived(this.doc.exists);
  readonly isLoaded = $derived(this.doc.isLoaded);

  readonly properties = new GalleryProperties({
    gallery: this,
  });

  readonly name = $derived(this.data!.name);

  async save() {
    return await this.doc.save();
  }

  async delete() {
    await this.doc.delete();
  }

  readonly dependencies = [this.doc];
  readonly serialized = $derived(serialized(this, ['id']));
}

export type NewGalleryModelOptions = {
  data: GalleryData;
};

export const buildNewGalleryModel = ({ data }: NewGalleryModelOptions) => {
  return new GalleryModel({
    doc: new Document<GalleryData>({
      ref: fs.doc(galleriesCollection),
      data,
    }),
  });
};

export const buildGalleryByIdModel = ({ id }: { id: string }) => {
  return new GalleryModel({
    doc: new Document<GalleryData>({
      ref: fs.doc(galleriesCollection, id),
    }),
  });
};
