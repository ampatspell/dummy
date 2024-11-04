import { Model } from '$dummy/lib/firebase/fire/model.svelte';
import type { Point } from '$dummy/lib/utils/types';
import type { ItemRegistration } from './items.svelte';
import type { Measurements } from './measurements.svelte';

export type DragOptions<T> = {
  models: T[];
  selected: T[];
  element: HTMLElement | undefined;
  mouse: Point | undefined;
  measurements: Measurements<T>;
  modelForTarget: (el: HTMLElement) => ItemRegistration<T> | undefined;
  onReorder: (models: T[]) => void;
};

export type DragStateOptions<T> = {
  dragging: T[];
  models: T[];
  offset: Point;
};

export class DragState<T> {
  dragging = $state<T[]>()!;
  models = $state<T[]>()!;
  offset = $state<Point>()!;

  constructor(opts: DragStateOptions<T>) {
    this.dragging = opts.dragging;
    this.models = opts.models;
    this.offset = opts.offset;
  }
}

export class Drag<T> extends Model<DragOptions<T>> {
  state = $state<DragState<T>>();
  models = $derived(this.state?.models ?? this.options.models);

  isDragging(model: T) {
    return this.state?.dragging.includes(model);
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

    this.state = new DragState<T>({
      dragging,
      models,
      offset,
    });
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
    const state = this.state;
    if (state) {
      const registration = this.options.modelForTarget(target);
      if (registration) {
        const { model: over } = registration;
        const dragging = state.dragging;
        if (dragging.includes(over)) {
          return;
        }
        const position = this.calculatePosition(registration.element, mouse);
        const current = state.models;
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
        state.models = next;
      }
    }
  }

  end() {
    const models = this.state?.models;
    if (models) {
      this.options.onReorder(models);
      this.state = undefined;
    }
  }

  positionFor(model: T) {
    const measurements = this.options.measurements;
    if (this.isDragging(model)) {
      const { element, mouse } = this.options;
      if (element && mouse) {
        const rect = element.getBoundingClientRect();
        const state = this.state!;
        const x = state!.dragging.indexOf(model) * measurements.item!;
        const offset = state.offset;
        return {
          x: mouse.x - rect.left + x - offset.x,
          y: mouse.y - rect.top - offset.y,
        };
      }
    } else {
      return measurements.positionFor(model);
    }
  }
}
