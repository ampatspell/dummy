import { Model, Subscribable } from '../firebase/fire/model.svelte';
import { Document, type UpdateCallback, update } from '../firebase/fire/document.svelte';
import * as fs from '@firebase/firestore';
import { serialized } from '../utils/object';
import { data, DocumentModelProperties } from '../utils/property.svelte';
import { getter } from '../utils/options';
import { galleriesCollection } from './galleries.svelte';
import { GalleryUploadModel } from './upload.svelte';
import { QueryAll } from '../firebase/fire/query.svelte';
import { MapModel, MapModels } from '../firebase/fire/models.svelte';
import { GalleryImageModel } from './image.svelte';
import { existing, isExisting } from '../utils/existing';
import type { SortDescriptor } from '../utils/array';
import { isLoaded } from '../firebase/fire/utils.svelte';
import type { HasSubscriber } from '../firebase/fire/subscriber.svelte';
import type { AssetsFileData, AssetsFolderData } from '$dummy-shared/documents';

export type GalleryBaseModelOptions = {
  doc: Document<AssetsFolderData>;
};

export class GalleryBaseModel extends Subscribable<GalleryBaseModelOptions> {
  readonly doc = $derived(this.options.doc);
  readonly id = $derived(this.doc.id!);
  readonly ref = $derived(this.doc.ref!);
  readonly path = $derived(this.doc.path!);
  readonly data = $derived(this.doc.data);
  readonly exists = $derived(this.doc.exists);

  readonly isLoaded = $derived(isLoaded([this.doc]));

  readonly name = $derived(this.data?.name);
  readonly numberOfFiles = $derived(this.data?.files);

  readonly dependencies: HasSubscriber[] = [this.doc];
  readonly serialized = $derived(serialized(this, ['id']));

  static documentForId(id: string) {
    return new Document<AssetsFolderData>({
      ref: fs.doc(galleriesCollection, id),
    });
  }

  static buildById(id: string) {
    return new GalleryModel({
      doc: GalleryBaseModel.documentForId(id),
    });
  }
}

class GalleryProperties extends DocumentModelProperties<AssetsFolderData> {
  readonly name = data(this, 'name');
}

export type GalleryRuntimeModelOptions = {
  gallery: GalleryModel;
};

export class GalleryRuntimeModel extends Model<GalleryRuntimeModelOptions> {
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

export class GalleryModel extends GalleryBaseModel {
  readonly _imagesQuery = new QueryAll<AssetsFileData>({
    ref: getter(() => fs.collection(this.ref, 'files')),
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
    model: this,
  });

  async save() {
    return await this.doc.save();
  }

  async delete() {
    await this.doc.delete();
  }

  update = (cb: UpdateCallback<AssetsFolderData>) => update(this.doc, cb);

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

  runtime = new GalleryRuntimeModel({
    gallery: this,
  });

  readonly dependencies = [this.doc, this._imagesQuery, this._images];
  readonly serialized = $derived(serialized(this, ['id']));

  static buildNew({ data }: { data: AssetsFolderData }) {
    return new GalleryModel({
      doc: new Document<AssetsFolderData>({
        ref: fs.doc(galleriesCollection),
        data,
      }),
    });
  }

  static buildById(id: string) {
    return new GalleryModel({
      doc: GalleryBaseModel.documentForId(id),
    });
  }

  static async createNew() {
    const gallery = GalleryModel.buildNew({
      data: {
        name: 'Untitled',
        files: 0,
      },
    });
    await gallery.save();
    return gallery;
  }
}

export type GalleryByIdModelOptions = {
  id: string | undefined;
};

export class GalleryByIdModel extends Subscribable<GalleryByIdModelOptions> {
  readonly id = $derived(this.options.id);

  readonly _model = new MapModel({
    source: getter(() => this.id),
    target: (id) => GalleryModel.buildById(id),
  });

  readonly content = $derived(this._model.content);
  readonly existing = $derived(existing(this.content));
  readonly exists = $derived(this.content?.exists);

  readonly isLoaded = $derived(isLoaded([this.content]));
  readonly dependencies = [this._model];
  readonly serialized = $derived(serialized(this, ['id', 'exists', 'isLoaded']));
}
