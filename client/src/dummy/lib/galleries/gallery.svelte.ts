import { Model, Subscribable } from '../firebase/fire/model.svelte';
import { Document, update, type UpdateCallback } from '../firebase/fire/document.svelte';
import * as fs from '@firebase/firestore';
import { serialized } from '../utils/object';
import { Properties, Property, type PropertiesOptions } from '../utils/property.svelte';
import { getter, type OptionsInput } from '../utils/options';
import { galleriesCollection } from './galleries.svelte';
import { GalleryUploadModel } from './upload.svelte';
import { QueryAll } from '../firebase/fire/query.svelte';
import { MapModel, MapModels } from '../firebase/fire/models.svelte';
import { GalleryImageModel } from './image.svelte';
import { isExisting } from '../utils/existing';
import type { GalleryData, GalleryImageData } from '$dummy-shared/documents';

export type GalleryModelOptions = {
  doc: Document<GalleryData>;
};

export type GalleryPropertiesOptions = {
  gallery: GalleryModel;
} & PropertiesOptions;

export type MutateOptions<D extends fs.DocumentData, V> = {
  doc: Document<D>;
  value: (data: D) => V;
  update: (data: D, value: V) => void;
};

class GalleryProperties extends Properties<GalleryPropertiesOptions> {
  private gallery = $derived(this.options.gallery);
  private data = $derived(this.gallery.data!);

  readonly name = new Property<string>({
    delegate: this,
    value: getter(() => this.data.name),
    update: (value) => (this.data.name = value),
  });
}

export type GalleryRuntimeOptions = {
  gallery: GalleryModel;
};

export class GalleryRuntime extends Model<GalleryRuntimeOptions> {
  private _selected = $state.raw<GalleryImageModel[]>([]);
  readonly selected = $derived(this._selected.filter(isExisting));

  isMultiple = $derived(this.selected.length > 1);

  clear() {
    this._selected = [];
  }

  isSelected(image: GalleryImageModel) {
    return this.selected.includes(image);
  }

  select(model: GalleryImageModel) {
    if (!this.selected.includes(model)) {
      this._selected = [...this.selected, model];
    }
  }

  deselect(model: GalleryImageModel) {
    if (this.selected.includes(model)) {
      this._selected = this.selected.filter((image) => image !== model);
    }
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
    didUpdate: () => this.doc.save(),
  });

  readonly name = $derived(this.data?.name);

  async save() {
    return await this.doc.save();
  }

  async delete() {
    await this.doc.delete();
  }

  update = (cb: UpdateCallback<GalleryData>) => update(this.doc, cb);

  upload() {
    return new GalleryUploadModel({
      gallery: this,
    });
  }

  runtime = new GalleryRuntime({
    gallery: this,
  });

  readonly dependencies = [this.doc, this._imagesQuery, this._images];
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

export const createNewGallery = async () => {
  const gallery = buildNewGalleryModel({
    data: {
      name: 'Untitled',
    },
  });
  await gallery.save();
  return gallery;
};

export type MapGalleryByIdOptions = {
  id: string | undefined;
};

export const mapGalleryById = (opts: OptionsInput<MapGalleryByIdOptions>) => {
  return new MapModel({
    source: opts.id,
    target: (id) => buildGalleryByIdModel({ id }),
  });
};
