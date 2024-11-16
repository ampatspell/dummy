import * as fs from '@firebase/firestore';
import type { UserData } from '$dummy-shared/documents';
import { Document } from '../firebase/fire/document.svelte';
import { Subscribable } from '../firebase/fire/model.svelte';
import { isLoaded } from '../firebase/fire/utils.svelte';
import { serialized } from '../utils/object';
import { usersCollection } from './users.svelte';

export type UserModelOptions = {
  doc: Document<UserData>;
};

export class UserModel extends Subscribable<UserModelOptions> {
  readonly doc = $derived(this.options.doc);
  readonly id = $derived(this.doc.id!);
  readonly exists = $derived(this.doc.exists);
  readonly data = $derived(this.doc.data);

  readonly email = $derived(this.data?.email ?? undefined);
  readonly isAnonymous = $derived(this.data?.isAnonymous);
  readonly role = $derived(this.data?.role ?? undefined);

  readonly isAdmin = $derived(this.role === 'admin');

  readonly isLoaded = $derived(isLoaded([this.doc]));
  readonly dependencies = [this.doc];
  readonly serialized = $derived(serialized(this, ['id']));

  static buildById(id: string) {
    return new UserModel({
      doc: new Document({
        ref: fs.doc(usersCollection, id),
      }),
    });
  }
}
