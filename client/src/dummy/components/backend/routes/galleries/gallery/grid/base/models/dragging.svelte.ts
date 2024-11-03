import { Model } from '$dummy/lib/firebase/fire/model.svelte';
import type { Point } from '$dummy/lib/utils/types';
import type { GridContextItems } from './items.svelte';

export type GridContextDraggingOptions<T> = {
  items: GridContextItems<T>;
};

export class GridContextDragging<T> extends Model<GridContextDraggingOptions<T>> {
  models = $state<T[]>([]);
  selected = $state<T[]>([]);
  last?: { over: T; position: 'before' | 'after' };

  readonly isDragging = $derived(this.selected.length > 0);

  isDraggingModel(model: T) {
    return this.selected.includes(model);
  }

  onStart(models: T[], selected: T[]) {
    this.models = [...models];
    this.selected = [...selected];
  }

  onEnd() {
    const models = this.models;
    this.models = [];
    this.selected = [];
    this.last = undefined;
    return models;
  }

  onOver(over: T, position: 'before' | 'after') {
    const next = [];
    const current = this.models;
    const selected = this.selected;
    const last = this.last;

    if (last?.over === over && last?.position === position) {
      return;
    }

    if (last && selected.includes(over)) {
      return;
    }

    this.last = { over, position };

    for (let i = 0; i < current.length; i++) {
      const model = current[i];
      if (!selected.includes(model)) {
        if (position === 'after') {
          next.push(model);
        }
        if (model === over) {
          next.push(...selected);
        }
        if (position === 'before') {
          next.push(model);
        }
      }
    }
    this.models = next;
  }

  private calculatePosition(element: HTMLElement, mouse: Point) {
    const rect = element.getBoundingClientRect();
    if (rect.x + rect.width / 2 > mouse.x) {
      return 'before';
    } else {
      return 'after';
    }
  }

  onUpdate(target: HTMLElement, mouse: Point) {
    if (this.isDragging) {
      const over = this.options.items.getRegistration(target);
      if (over) {
        const { element, model } = over;
        const position = this.calculatePosition(element, mouse);
        this.onOver(model, position);
      }
    }
  }
}
