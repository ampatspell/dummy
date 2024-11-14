import { Model, Subscribable } from '../firebase/fire/model.svelte';
import { Document, type UpdateCallback, update } from '../firebase/fire/document.svelte';
import * as fs from '@firebase/firestore';
import { serialized } from '../utils/object';
import { data, Properties, type PropertiesOptions } from '../utils/property.svelte';
import { type OptionsInput, getter } from '../utils/options';
import { galleriesCollection } from './galleries.svelte';
import { GalleryUploadModel } from './upload.svelte';
import { QueryAll } from '../firebase/fire/query.svelte';
import { MapModel, MapModels } from '../firebase/fire/models.svelte';
import { GalleryImageModel } from './image.svelte';
import { existing, isExisting } from '../utils/existing';
import type { GalleryData, GalleryImageData } from '$dummy-shared/documents';
import type { SortDescriptor } from '../utils/array';
import { isLoaded } from '../firebase/fire/utils.svelte';

export type GalleryModelOptions = {
  doc: Document<GalleryData>;
};

export type GalleryPropertiesOptions = {
  gallery: GalleryModel;
} & PropertiesOptions;

class GalleryProperties extends Properties<GalleryPropertiesOptions> {
  readonly data = $derived(this.options.gallery.data!);
  readonly name = data(this, 'name');
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

  select(model: GalleryImageModel[]) {
    this._selected = [...model];
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

  readonly isLoaded = $derived(isLoaded([this.doc, this._imagesQuery]));

  readonly _images = new MapModels({
    source: getter(() => this._imagesQuery.content),
    target: (doc) => new GalleryImageModel({ gallery: this, doc }),
    sort: getter<SortDescriptor<GalleryImageModel>>(() => {
      return { value: (image) => image.position ?? Infinity, direction: 'asc' };
    }),
  });

  readonly images = $derived(this._images.sorted);

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

  reorder(models: GalleryImageModel[]) {
    models.forEach((model, idx) => {
      if (model.position !== idx) {
        model.update((data) => (data.position = idx));
      }
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

export type GalleryByIdModelOptions = {
  id: string | undefined;
};

export class GalleryByIdModel extends Subscribable<GalleryByIdModelOptions> {
  readonly id = $derived(this.options.id);

  readonly _byIdModel = mapGalleryById({
    id: getter(() => this.id),
  });

  readonly content = $derived(this._byIdModel.content);
  readonly existing = $derived(existing(this.content));
  readonly exists = $derived(this.content?.exists);

  readonly isLoaded = $derived(isLoaded([this.content]));
  readonly dependencies = [this._byIdModel];
  readonly serialized = $derived(serialized(this, ['id', 'exists', 'isLoaded']));
}
