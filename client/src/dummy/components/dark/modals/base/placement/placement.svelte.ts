import { Model } from '$dummy/lib/firebase/fire/model.svelte';
import type { Component, Snippet } from 'svelte';
import type { Modal } from '../modal.svelte';

export type PlacementComponentProps = { modal: Modal<unknown>; children: Snippet };

export abstract class Placement<O = unknown> extends Model<O> {
  abstract readonly component: Component<PlacementComponentProps>;
}
