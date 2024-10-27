import { Model } from "$base/lib/firebase/fire/model.svelte";
import type { Component, Snippet } from "svelte";
import type { Modal } from "./modal.svelte";
import Center from "../base/placement/center.svelte";

export type PlacementComponentProps = { modal: Modal<unknown>, children: Snippet };

export type PlacementOptions = {
  component: Component<PlacementComponentProps>;
};

export abstract class Placement<O extends PlacementOptions = PlacementOptions> extends Model<O> {
  readonly component = $derived(this.options.component);
}

//

export class CenterPlacement extends Placement {}

export const center = () => new CenterPlacement({
  component: Center,
});
