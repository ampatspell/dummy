import * as fs from '@firebase/firestore';
import { Subscribable } from '../firebase/fire/model.svelte';
import { firebase } from '../firebase/firebase.svelte';
import { Document } from '../firebase/fire/document.svelte';
import { type SiteData } from '$dummy-shared/documents';
import { serialized } from '../utils/object';
import { buildLayoutByIdModel } from '../layouts/layout.svelte';
import { MapModel } from '../firebase/fire/models.svelte';
import { getter } from '../utils/options';
import { isLoaded } from '../firebase/fire/utils.svelte';
import { Properties, type PropertiesOptions, Property } from '../utils/property.svelte';

export const siteRef = fs.doc(firebase.firestore, 'settings/site');

export type SitePropertiesModelOptions = {
  site: SiteModel;
} & PropertiesOptions;

export class SitePropertiesModel extends Properties<SitePropertiesModelOptions> {
  readonly data = $derived(this.options.site.data!);

  readonly layout = new Property<string | undefined>({
    delegate: this,
    value: getter(() => this.data.layout),
    update: (value) => (this.data.layout = value),
  });
}

export type SiteModelOptions = Record<string, never>;

export class SiteModel extends Subscribable<SiteModelOptions> {
  readonly doc = new Document<SiteData>({ ref: siteRef });
  readonly id = $derived(this.doc.id!);
  readonly data = $derived(this.doc.data);
  readonly exists = $derived(this.doc.exists);

  readonly properties = new SitePropertiesModel({
    site: this,
    didUpdate: () => this.doc.save(),
  });

  readonly _layout = new MapModel({
    source: getter(() => this.data?.layout),
    target: (id) => buildLayoutByIdModel({ id }),
  });

  readonly layout = $derived(this._layout.content);

  readonly isLoaded = $derived(isLoaded([this.doc, this.layout]));
  readonly dependencies = [this.doc, this._layout];
  readonly serialized = $derived(serialized(this, ['layout']));
}
