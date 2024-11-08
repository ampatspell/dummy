import * as fs from '@firebase/firestore';
import { Subscribable } from '../firebase/fire/model.svelte';
import { firebase } from '../firebase/firebase.svelte';
import { Document } from '../firebase/fire/document.svelte';
import { type SiteData } from '$dummy-shared/documents';
import { serialized } from '../utils/object';
import { buildLayoutByIdModel } from '../layouts/layout.svelte';
import { MapModel } from '../firebase/fire/models.svelte';
import { getter } from '../utils/options';

export const siteRef = fs.doc(firebase.firestore, 'settings/site');

export type SiteModelOptions = Record<string, never>;

export class SiteModel extends Subscribable<SiteModelOptions> {
  readonly doc = new Document<SiteData>({ ref: siteRef });
  readonly id = $derived(this.doc.id!);
  readonly data = $derived(this.doc.data);
  readonly exists = $derived(this.doc.exists);

  readonly _layout = new MapModel({
    source: getter(() => this.data?.layout),
    target: (id) => buildLayoutByIdModel({ id }),
  });

  readonly layout = $derived(this._layout.content);

  readonly isLoaded = $derived(this.doc.isLoaded && (this.layout?.isLoaded ?? true));

  readonly dependencies = [this.doc, this._layout];

  readonly serialized = $derived(serialized(this, ['layout']));
}

export const buildSiteModel = () => new SiteModel({});
