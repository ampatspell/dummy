import Component from './component.svelte';
import { Placement } from '../placement.svelte';

export class CenterPlacement extends Placement<Record<string, never>> {
  readonly component = Component;
}

export const center = () => new CenterPlacement({});
