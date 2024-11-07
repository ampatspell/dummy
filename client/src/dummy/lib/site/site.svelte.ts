import * as fs from '@firebase/firestore';
import { Subscribable } from '../firebase/fire/model.svelte';
import { firebase } from '../firebase/firebase.svelte';
import { Document } from '../firebase/fire/document.svelte';
import { type SiteData } from '$dummy-shared/documents';
import { serialized } from '../utils/object';
import { getSiteDefinition } from '../definition/definition.svelte';

export const siteRef = fs.doc(firebase.firestore, 'settings/site');

export type SiteModelOptions = Record<string, never>;

export class SiteModel extends Subscribable<SiteModelOptions> {
  readonly doc = new Document<SiteData>({ ref: siteRef });
  readonly id = $derived(this.doc.id!);
  readonly data = $derived(this.doc.data);
  readonly exists = $derived(this.doc.exists);

  readonly layout = $derived.by(() => {
    const id = this.data?.layout;
    if (id) {
      return getSiteDefinition().layouts.layout(id);
    }
  });

  readonly isLoaded = $derived(this.doc.isLoaded);

  readonly dependencies = [this.doc];

  readonly serialized = $derived(serialized(this, ['layout']));
}

export const buildSiteModel = () => new SiteModel({});
