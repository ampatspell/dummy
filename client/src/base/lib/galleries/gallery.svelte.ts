import { Model, Subscribable } from '../firebase/fire/model.svelte';
import { Document } from '../firebase/fire/document.svelte';
import * as fs from '@firebase/firestore';
import { serialized } from '../utils/object';
import { Properties, Property, type PropertiesOptions } from '../utils/property.svelte';
import { getter } from '../utils/options';
import { galleriesCollection } from './galleries.svelte';
import { GalleryUploadModel } from './upload.svelte';
import { QueryAll } from '../firebase/fire/query.svelte';
import { MapModels } from '../firebase/fire/models.svelte';
import { GalleryImageModel, type GalleryImageData } from './image.svelte';
import { existing } from '../utils/existing';

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

export type GalleryRuntimeOptions = {
  gallery: GalleryModel;
};

export class GalleryRuntime extends Model<GalleryRuntimeOptions> {
  _image = $state<GalleryImageModel>();

  image = $derived(existing(this._image));

  selected = $derived(this.image || this.options.gallery);

  select(model: GalleryImageModel | undefined) {
    this._image = model;
  }
}

export class GalleryModel extends Subscribable<GalleryModelOptions> {
  readonly doc = $derived(this.options.doc);
  readonly id = $derived(this.doc.id!);
  readonly ref = $derived(this.doc.ref!);
  readonly path = $derived(this.doc.path!);
  readonly data = $derived(this.doc.data);
  readonly exists = $derived(this.doc.exists);

  readonly _imagesQuery = new QueryAll<GalleryImageData>({
    ref: getter(() => fs.collection(this.ref, 'images')),
  });

  readonly isLoaded = $derived(this.doc.isLoaded && this._imagesQuery.isLoaded);

  readonly _images = new MapModels({
    source: getter(() => this._imagesQuery.content),
    target: (doc) => new GalleryImageModel({ gallery: this, doc }),
  });

  readonly images = $derived(this._images.content);

  readonly properties = new GalleryProperties({
    gallery: this,
  });

  readonly name = $derived(this.data?.name);

  async save() {
    return await this.doc.save();
  }

  async delete() {
    await this.doc.delete();
  }

  upload() {
    return new GalleryUploadModel({
      gallery: this,
    });
  }

  runtime = new GalleryRuntime({
    gallery: this,
  });

  readonly dependencies = [this.doc, this._imagesQuery];
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
