import type { AssetsFileData } from '$dummy-shared/documents';
import { Document, type UpdateCallback, update } from '../firebase/fire/document.svelte';
import { Model } from '../firebase/fire/model.svelte';
import { DocumentModelProperties } from '../utils/property.svelte';
import type { FolderModel } from './gallery.svelte';

export type GalleryImageRuntimeModelOptions = {
  image: GalleryImageModel;
};

export class GalleryImageRuntimeModel extends Model<GalleryImageRuntimeModelOptions> {
  readonly image = $derived(this.options.image);
  readonly gallery = $derived(this.image.gallery);
  readonly isSelected = $derived(this.gallery.runtime.isSelected(this.image));
}

export class GalleryImagePropertiesModel extends DocumentModelProperties<AssetsFileData> {}

export type GalleryImageModelOptions = {
  gallery: FolderModel;
  doc: Document<AssetsFileData>;
};

export class GalleryImageModel extends Model<GalleryImageModelOptions> {
  get gallery() {
    return this.options.gallery;
  }

  readonly doc = $derived(this.options.doc);
  readonly id = $derived(this.doc.id);
  readonly data = $derived(this.doc.data!);
  readonly exists = $derived(this.doc.exists);
  readonly isDeleting = $derived(this.doc.isDeleting);

  readonly properties = new GalleryImagePropertiesModel({
    model: this,
  });

  readonly runtime = new GalleryImageRuntimeModel({ image: this });

  readonly name = $derived(this.data.name);
  readonly position = $derived(this.data.position);
  readonly original = $derived(this.data.original);
  readonly thumbnails = $derived(this.data.thumbnails);

  update = (cb: UpdateCallback<AssetsFileData>) => update(this.doc, cb);

  async delete() {
    await this.doc.delete();
  }
}
