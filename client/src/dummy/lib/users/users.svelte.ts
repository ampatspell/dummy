import * as fs from '@firebase/firestore';
import { Subscribable } from '../firebase/fire/model.svelte';
import { firebase } from '../firebase/firebase.svelte';
import { QueryAll } from '../firebase/fire/query.svelte';
import { getter } from '../utils/options';
import { MapModels } from '../firebase/fire/models.svelte';
import { UserModel } from './user.svelte';
import { type UserData } from '$dummy-shared/documents';
import { isLoaded } from '../firebase/fire/utils.svelte';

export const usersCollection = fs.collection(firebase.firestore, 'users');

export type UsersModelOptions = Record<string, never>;

export class UsersModel extends Subscribable<UsersModelOptions> {
  readonly _query = new QueryAll<UserData>({
    ref: getter(() => usersCollection),
  });

  readonly _all = new MapModels({
    source: getter(() => this._query.content),
    target: (doc) => new UserModel({ doc }),
  });

  readonly all = $derived(this._all.content);

  readonly isLoaded = $derived(isLoaded([this._query]));
  readonly dependencies = [this._query, this._all];

  static build() {
    return new UsersModel({});
  }
}
