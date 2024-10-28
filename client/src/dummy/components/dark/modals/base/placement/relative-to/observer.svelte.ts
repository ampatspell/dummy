import { Model } from '$dummy/lib/firebase/fire/model.svelte';
import { getter, type OptionsInput } from '$dummy/lib/utils/options';
import type { RelativeToPlacement } from './relative-to.svelte';

export type ElementStateOptions = {
  observer: RelativeToPlacementObserver;
  element?: HTMLElement;
};

export class ElementState extends Model<ElementStateOptions> {
  element = $derived(this.options.element);
  observer = $derived(this.options.observer);
  rect = $state<DOMRectReadOnly>();

  constructor(opts: OptionsInput<ElementStateOptions>) {
    super(opts);
    $effect(() => {
      const element = this.element;
      if (element) {
        return this.observer.observe(this);
      }
    });
  }

  onEntry() {
    this.rect = this.element!.getBoundingClientRect();
  }
}

export type RelativeToPlacementObserverOptions = {
  placement: RelativeToPlacement;
  content: HTMLElement | undefined;
};

export class RelativeToPlacementObserver extends Model<RelativeToPlacementObserverOptions> {
  private observer?: ResizeObserver;
  private readonly parent: ElementState;
  private readonly modal: ElementState;
  private readonly elements: ElementState[];

  placement = $derived(this.options.placement);

  constructor(opts: OptionsInput<RelativeToPlacementObserverOptions>) {
    super(opts);
    this.parent = new ElementState({
      observer: this,
      element: getter(() => this.placement.relativeTo),
    });
    this.modal = new ElementState({
      observer: this,
      element: getter(() => this.options.content),
    });
    this.elements = [this.parent, this.modal];
    $effect.pre(() => {
      $effect.pre(() => {
        this.observer = new ResizeObserver((entries) => {
          this.onEntries(entries);
        });
        return () => {
          this.observer?.disconnect();
        };
      });
    });
  }

  observe(state: ElementState) {
    const element = state.element;
    const observer = this.observer;
    if (element && observer) {
      observer.observe(element);
      return () => {
        observer.unobserve(element);
      };
    }
  }

  private onEntries(entries: ResizeObserverEntry[]) {
    for (const entry of entries) {
      const target = entry.target;
      const state = this.elements.find((element) => element.element === target);
      if (state) {
        state.onEntry();
      }
    }
  }

  readonly rect = $derived.by(() => {
    const modal = this.modal.rect;
    const parent = this.parent.rect;
    if (modal && parent) {
      return this.placement.position(modal, parent);
    }
  });
}
