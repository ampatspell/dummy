import type { AssetsFileData } from '$dummy-shared/documents';
import { Document, type UpdateCallback, update } from '../firebase/fire/document.svelte';
import { Model } from '../firebase/fire/model.svelte';
import { DocumentModelProperties } from '../utils/property.svelte';
import type { FolderModel } from './gallery.svelte';

export type FileRuntimeModelOptions = {
  image: FileModel;
};

export class FileRuntimeModel extends Model<FileRuntimeModelOptions> {
  readonly image = $derived(this.options.image);
  readonly gallery = $derived(this.image.gallery);
  readonly isSelected = $derived(this.gallery.runtime.isSelected(this.image));
}

export class FilePropertiesModel extends DocumentModelProperties<AssetsFileData> {}

export type GalleryImageModelOptions = {
  gallery: FolderModel;
  doc: Document<AssetsFileData>;
};

export class FileModel extends Model<GalleryImageModelOptions> {
  get gallery() {
    return this.options.gallery;
  }

  readonly doc = $derived(this.options.doc);
  readonly id = $derived(this.doc.id);
  readonly data = $derived(this.doc.data!);
  readonly exists = $derived(this.doc.exists);
  readonly isDeleting = $derived(this.doc.isDeleting);

  readonly properties = new FilePropertiesModel({
    model: this,
  });

  readonly runtime = new FileRuntimeModel({ image: this });

  readonly name = $derived(this.data.name);
  readonly position = $derived(this.data.position);
  readonly original = $derived(this.data.original);
  readonly thumbnails = $derived(this.data.thumbnails);

  update = (cb: UpdateCallback<AssetsFileData>) => update(this.doc, cb);

  async delete() {
    await this.doc.delete();
  }
}
