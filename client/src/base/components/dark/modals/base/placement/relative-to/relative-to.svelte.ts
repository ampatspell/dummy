import type { OptionsInput } from '$base/lib/utils/options';
import { Placement } from '../placement.svelte';
import Component from './component.svelte';

export type Offset = { x: number; y: number };
export type Position = { top: number; left: number };

export type RelativeToPlacementOptions = {
  relativeTo: HTMLElement | undefined;
  offset: Offset;
};

export type RelativeToPlacementOptionsWithoutPosition = Omit<RelativeToPlacementOptions, 'placement'>;

export abstract class RelativeToPlacement extends Placement<RelativeToPlacementOptions> {
  readonly component = Component;
  readonly offset = $derived(this.options.offset);
  readonly relativeTo = $derived(this.options.relativeTo);
  abstract position(modal: DOMRectReadOnly, parent: DOMRectReadOnly): Position;
}

export class RelativeToBottomLeftPlacement extends RelativeToPlacement {
  position(modal: DOMRectReadOnly, parent: DOMRectReadOnly) {
    return {
      top: parent.top + parent.height + this.offset.y,
      left: parent.left + this.offset.x,
    };
  }
}

export const relativeToBottomLeft = (opts: OptionsInput<RelativeToPlacementOptions>) => {
  return new RelativeToBottomLeftPlacement(opts);
};

//

export class RelativeToBottomRightPlacement extends RelativeToPlacement {
  position(modal: DOMRectReadOnly, parent: DOMRectReadOnly) {
    return {
      top: parent.top + parent.height + this.offset.y,
      left: parent.left + parent.width - modal.width + this.offset.x,
    };
  }
}

export const relativeToBottomRight = (opts: OptionsInput<RelativeToPlacementOptions>) => {
  return new RelativeToBottomRightPlacement(opts);
};
