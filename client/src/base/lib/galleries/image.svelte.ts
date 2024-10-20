import { Document } from '../firebase/fire/document.svelte';
import { Model } from '../firebase/fire/model.svelte';
import type { GalleryModel } from './gallery.svelte';

export type GalleryImageData = {
  name: string;
  createdAt: Date;
  sizes: {
    [key: string]: {
      url: string;
      size: { width: number; height: number };
    };
  };
};

export type GalleryImageModelOptions = {
  gallery: GalleryModel;
  doc: Document<GalleryImageData>;
};

export class GalleryImageModel extends Model<GalleryImageModelOptions> {
  readonly doc = $derived(this.options.doc);
  readonly id = $derived(this.doc.id);
  readonly data = $derived(this.doc.data);
  readonly exists = $derived(this.doc.exists);

  select() {
    this.options.gallery.runtime.select(this);
  }
}
