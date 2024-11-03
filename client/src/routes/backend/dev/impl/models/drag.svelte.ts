import { Model } from '$dummy/lib/firebase/fire/model.svelte';
import type { Point } from '$dummy/lib/utils/types';
import type { ItemRegistration } from './items.svelte';

export type DragOptions<T> = {
  models: T[];
  selected: T[];
  modelForTarget: (el: HTMLElement) => ItemRegistration<T> | undefined;
  onReorder: (models: T[]) => void;
};

export class Drag<T> extends Model<DragOptions<T>> {
  dragging = $state<T[]>();
  _models = $state<T[]>();
  offset = $state<Point>();

  models = $derived(this._models ?? this.options.models);

  isDragging(model: T) {
    return this.dragging?.includes(model);
  }

  start(source: T, offset: Point) {
    const dragging = [...this.models.filter((model) => this.options.selected.includes(model))];
    const models = [];
    const original = this.options.models;
    for (let i = 0; i < original.length; i++) {
      const model = original[i];
      if (model === source) {
        models.push(...dragging);
      } else if (!dragging.includes(model)) {
        models.push(model);
      }
    }

    this.dragging = dragging;
    this._models = models;
    this.offset = offset;
  }

  private calculatePosition(element: HTMLElement, mouse: Point) {
    const rect = element.getBoundingClientRect();
    if (rect.x + rect.width / 2 > mouse.x) {
      return 'before';
    } else {
      return 'after';
    }
  }

  update(target: HTMLElement, mouse: Point) {
    if (this.dragging) {
      const registration = this.options.modelForTarget(target);
      if (registration) {
        const { model: over } = registration;
        const dragging = this.dragging;
        if (dragging.includes(over)) {
          return;
        }
        const position = this.calculatePosition(registration.element, mouse);
        const current = this._models;
        if (current) {
          const next = [];
          for (let i = 0; i < current.length; i++) {
            const model = current[i];
            if (!dragging.includes(model)) {
              if (position === 'after') {
                next.push(model);
              }
              if (model === over) {
                next.push(...dragging);
              }
              if (position === 'before') {
                next.push(model);
              }
            }
          }
          this._models = next;
        }
      }
    }
  }

  end() {
    const models = this._models;
    if (models) {
      this.options.onReorder(models);
    }
    this.dragging = undefined;
    this._models = undefined;
  }
}
