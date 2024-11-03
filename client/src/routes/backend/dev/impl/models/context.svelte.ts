import { Model } from '$dummy/lib/firebase/fire/model.svelte';
import { getter, type OptionsInput } from '$dummy/lib/utils/options';
import { getContext, setContext } from 'svelte';
import { Measurements } from './measurements.svelte';
import { Drag } from './drag.svelte';
import { Items } from './items.svelte';
import type { Point } from '$dummy/lib/utils/types';

export type GridContextOptions<T> = {
  width: number;
  mouse: Point | undefined;
  element: HTMLElement | undefined;
  models: T[];
  selected: T[];
  onSelect: (models: T[]) => void;
  onReorder: (models: T[]) => void;
};

class GridContext<T> extends Model<GridContextOptions<T>> {
  readonly measurements = new Measurements<T>({
    width: getter(() => this.options.width),
    models: getter(() => this.models),
  });

  readonly drag = new Drag<T>({
    models: getter(() => this.options.models),
    selected: getter(() => this.selected),
    modelForTarget: (el) => this.items.getRegistration(el),
    onReorder: (models) => this.options.onReorder(models),
  });

  readonly items = new Items<T>();
  readonly models = $derived(this.drag.models);
  readonly selected = $derived(this.options.selected);

  positionFor(model: T) {
    if (this.drag.isDragging(model)) {
      const { element, mouse } = this.options;
      if (element && mouse) {
        const rect = element.getBoundingClientRect();
        const offset = this.drag.dragging!.indexOf(model) * this.measurements.item!;
        return {
          x: mouse.x - rect.left + offset - this.drag.offset!.x,
          y: mouse.y - rect.top - this.drag.offset!.y,
        };
      }
    } else {
      return this.measurements.positionFor(model);
    }
  }

  isSelected(model: T) {
    return this.selected.includes(model);
  }

  select(model: T, shiftKey: boolean) {
    const isSelected = this.isSelected(model);
    let models;
    if (shiftKey) {
      if (isSelected) {
        models = this.selected.filter((selected) => selected !== model);
      } else {
        models = [...this.selected, model];
      }
    } else if (!isSelected) {
      models = [model];
    }
    if (models) {
      this.options.onSelect(models);
    }
  }
}

const KEY = 'grid';
export const createGridContext = <T>(opts: OptionsInput<GridContextOptions<T>>) =>
  setContext(KEY, new GridContext(opts));
export const getGridContext = <T>() => getContext(KEY) as GridContext<T>;
