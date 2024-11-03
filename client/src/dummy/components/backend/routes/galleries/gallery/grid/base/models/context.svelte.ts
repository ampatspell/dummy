import { Model } from '$dummy/lib/firebase/fire/model.svelte';
import { createContext } from '$dummy/lib/utils/context';
import { type OptionsInput } from '$dummy/lib/utils/options';
import type { Point } from '$dummy/lib/utils/types';
import { GridContextDragging } from './dragging.svelte';
import { GridContextItems } from './items.svelte';
import { GridContextMeasurements } from './measurements.svelte';

export type GridContextOptions<T> = {
  isEditing: boolean;
  models: T[];
  selected: T[];
  onSelect: (model: T[]) => void;
  onReorder: (models: T[]) => void;
};

export class GridContext<T> extends Model<GridContextOptions<T>> {
  readonly _models = $derived(this.options.models);
  readonly isEditing = $derived(this.options.isEditing);
  readonly selected = $derived(this.options.selected);

  readonly models = $derived.by(() => {
    const dragging = this.dragging;
    if (dragging.isDragging) {
      return dragging.models;
    }
    return this._models;
  });

  readonly measurements = new GridContextMeasurements();
  readonly items = new GridContextItems<T>();
  readonly dragging = new GridContextDragging<T>();

  isSelected(model: T) {
    return this.selected.includes(model);
  }

  onDragStart(model: T) {
    if (this.selected.length === 0) {
      this.options.onSelect([model]);
    }

    if (this.isSelected(model)) {
      this.dragging.onStart(this.options.models, this.selected);
    }
  }

  private calculatePosition(element: HTMLElement, mouse: Point) {
    const rect = element.getBoundingClientRect();
    if (rect.x + rect.width / 2 > mouse.x) {
      return 'before';
    } else {
      return 'after';
    }
  }

  onDragUpdate(target: HTMLElement, mouse: Point) {
    if (this.dragging.isDragging) {
      const over = this.items.getRegistration(target);
      if (over) {
        const position = this.calculatePosition(over.element!, mouse);
        const model = over.model;
        this.dragging.onOver(model, position);
      }
    }
  }

  onDragEnd() {
    const models = this.dragging.onEnd();
    this.options.onReorder(models);
  }
}

const create = <T>() => createContext<GridContext<T>>('grid');

const getGridContext = <T>() => {
  return create<T>().get();
};

const createGridContext = <T>(opts: OptionsInput<GridContextOptions<T>>) => {
  return create<T>().set(new GridContext<T>(opts));
};

export { getGridContext, createGridContext };
