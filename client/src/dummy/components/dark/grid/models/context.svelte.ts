import { Model } from '$dummy/lib/firebase/fire/model.svelte';
import { type OptionsInput, getter } from '$dummy/lib/utils/options';
import { getContext, setContext } from 'svelte';
import { Measurements } from './measurements.svelte';
import { Drag } from './drag.svelte';
import { Items } from './items.svelte';
import type { Point } from '$dummy/lib/utils/types';

export type GridContextOptions<T> = {
  width: number;
  mouse: Point | undefined;
  element: HTMLElement | undefined;
  isEditing: boolean;
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

  readonly drag: Drag<T> = new Drag<T>({
    models: getter(() => this.options.models),
    selected: getter(() => this.selected),
    modelForTarget: (el) => this.items.getRegistration(el),
    onReorder: (models) => this.options.onReorder(models),
    element: getter(() => this.options.element),
    mouse: getter(() => this.options.mouse),
    measurements: getter(() => this.measurements),
  });

  readonly items = new Items<T>();

  readonly models = $derived(this.drag.models);

  readonly selected = $derived(this.options.selected);
  readonly isEditing = $derived(this.options.isEditing);

  positionFor(model: T) {
    return this.drag.positionFor(model);
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

export const createGridContext = <T>(opts: OptionsInput<GridContextOptions<T>>) => {
  return setContext(KEY, new GridContext(opts));
};

export const getGridContext = <T>() => {
  return getContext(KEY) as GridContext<T>;
};
