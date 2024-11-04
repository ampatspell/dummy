import type { GalleryImageData } from '$dummy-shared/documents';
import { Document, update, type UpdateCallback } from '../firebase/fire/document.svelte';
import { Model } from '../firebase/fire/model.svelte';
import { Properties, type PropertiesOptions } from '../utils/property.svelte';
import type { GalleryModel } from './gallery.svelte';

export type GalleryImageRuntimeModelOptions = {
  image: GalleryImageModel;
};

export class GalleryImageRuntimeModel extends Model<GalleryImageRuntimeModelOptions> {
  readonly image = $derived(this.options.image);
  readonly gallery = $derived(this.image.gallery);
  readonly isSelected = $derived(this.gallery.runtime.isSelected(this.image));
}

export type GalleryImagePropertiesModelOptions = {
  image: GalleryImageModel;
} & PropertiesOptions;

export class GalleryImagePropertiesModel extends Properties<GalleryImagePropertiesModelOptions> {
  readonly data = $derived(this.options.image.data);
}

export type GalleryImageModelOptions = {
  gallery: GalleryModel;
  doc: Document<GalleryImageData>;
};

export class GalleryImageModel extends Model<GalleryImageModelOptions> {
  // TODO: blows up if $derived
  get gallery() {
    return this.options.gallery;
  }

  readonly doc = $derived(this.options.doc);
  readonly id = $derived(this.doc.id);
  readonly data = $derived(this.doc.data!);
  readonly exists = $derived(this.doc.exists);
  readonly isDeleting = $derived(this.doc.isDeleting);

  readonly properties = new GalleryImagePropertiesModel({
    image: this,
    didUpdate: () => this.doc.save(),
  });

  readonly runtime = new GalleryImageRuntimeModel({ image: this });

  name = $derived(this.data.name);
  position = $derived(this.data.position);
  thumbnails = $derived(this.data.sizes);

  update = (cb: UpdateCallback<GalleryImageData>) => update(this.doc, cb);

  async delete() {
    await this.doc.delete();
  }
}
