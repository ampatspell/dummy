import type { GalleryImageData } from '$dummy-shared/documents';
import { Document } from '../firebase/fire/document.svelte';
import { Model } from '../firebase/fire/model.svelte';
import type { GalleryModel } from './gallery.svelte';

export type GalleryImageRuntimeModelOptions = {
  image: GalleryImageModel;
};

export class GalleryImageRuntimeModel extends Model<GalleryImageRuntimeModelOptions> {
  readonly image = $derived(this.options.image);
  readonly gallery = $derived(this.image.gallery);
  readonly isSelected = $derived(this.gallery.runtime.isSelected(this.image));

  toggle({ replace }: { replace: boolean }) {
    const image = this.image;
    const runtime = this.gallery.runtime;
    const isSelected = this.isSelected;
    if (replace) {
      if (!isSelected || runtime.isMultiple) {
        runtime.clear();
        runtime.select(image);
      }
    } else {
      if (isSelected) {
        runtime.deselect(image);
      } else {
        runtime.select(image);
      }
    }
  }
}

export type GalleryImageModelOptions = {
  gallery: GalleryModel;
  doc: Document<GalleryImageData>;
};

export class GalleryImageModel extends Model<GalleryImageModelOptions> {
  readonly gallery = $derived(this.options.gallery);
  readonly doc = $derived(this.options.doc);
  readonly id = $derived(this.doc.id);
  readonly data = $derived(this.doc.data!);
  readonly exists = $derived(this.doc.exists);
  readonly isDeleting = $derived(this.doc.isDeleting);

  readonly runtime = new GalleryImageRuntimeModel({ image: this });

  name = $derived(this.data.name);
  thumbnails = $derived(this.data.sizes);

  async delete() {
    await this.doc.delete();
  }
}