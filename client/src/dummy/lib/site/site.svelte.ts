import * as fs from '@firebase/firestore';
import { Subscribable } from '../firebase/fire/model.svelte';
import { firebase } from '../firebase/firebase.svelte';
import { Document } from '../firebase/fire/document.svelte';
import { type SiteData } from '$dummy-shared/documents';
import { serialized } from '../utils/object';
import { MapModel } from '../firebase/fire/models.svelte';
import { getter } from '../utils/options';
import { isLoaded } from '../firebase/fire/utils.svelte';
import { data, DocumentModelProperties } from '../utils/property.svelte';
import { LayoutModel } from '../layouts/layout.svelte';

export const siteRef = fs.doc(firebase.firestore, 'settings/site');

export class SitePropertiesModel extends DocumentModelProperties<SiteData> {
  readonly layout = data(this, 'layout');
}

export type SiteModelOptions = Record<string, never>;

export class SiteModel extends Subscribable<SiteModelOptions> {
  readonly doc = new Document<SiteData>({ ref: siteRef });
  readonly id = $derived(this.doc.id!);
  readonly data = $derived(this.doc.data);
  readonly exists = $derived(this.doc.exists);

  readonly properties = new SitePropertiesModel({
    model: this,
  });

  readonly _layout = new MapModel({
    source: getter(() => this.data?.layout),
    target: (id) => LayoutModel.buildById(id),
  });

  readonly layout = $derived(this._layout.content);

  readonly isLoaded = $derived(isLoaded([this.doc, this.layout]));
  readonly dependencies = [this.doc, this._layout];
  readonly serialized = $derived(serialized(this, ['layout']));

  async load() {
    await this.doc.load();
    await this._layout.load((model) => model.load());
  }
}
