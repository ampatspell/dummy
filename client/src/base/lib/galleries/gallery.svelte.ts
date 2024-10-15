import { Model } from "../firebase/fire/model.svelte";
import { Document, update, type UpdateCallback } from "../firebase/fire/document.svelte";
import { firebase } from "../firebase/firebase.svelte";
import * as fs from "@firebase/firestore";
import { serialized } from "../utils/object";
import { Property } from "../utils/property.svelte";
import { getter } from "../utils/options";

export const galleriesCollection = fs.collection(firebase.firestore, 'galleries');

export const buildGalleryDocument = (data: GalleryData) => new Document<GalleryData>({
  ref: fs.doc(galleriesCollection),
  data,
});

export type GalleryData = {
  name: string;
};

export type GalleryModelOptions = {
  doc: Document<GalleryData>;
};

export type GalleryPropertiesOptions = {
  gallery: GalleryModel;
};

class GalleryProperties extends Model<GalleryPropertiesOptions> {
  private gallery = $derived(this.options.gallery);
  private data = $derived(this.gallery.data!);

  isDisabled = false;

  name = new Property({
    delegate: this,
    value: getter(() => this.data.name),
    update: (value: string) => this.data.name = value,
  });
}

export class GalleryModel extends Model<GalleryModelOptions> {
  doc = $derived(this.options.doc);
  id = $derived(this.doc.id);
  data = $derived(this.doc.data);

  properties = new GalleryProperties({ gallery: this });

  update = (cb: UpdateCallback<GalleryData>) => update(this.doc, cb);

  dependencies = [this.doc];
  serialized = $derived(serialized(this, ['id']));
}
