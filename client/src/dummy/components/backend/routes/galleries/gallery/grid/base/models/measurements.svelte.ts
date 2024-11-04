import { Model } from '$dummy/lib/firebase/fire/model.svelte';
import type { Point } from '$dummy/lib/utils/types';

export type MeasurementsOptions<T> = {
  width: number;
  models: T[];
};

export class Measurements<T> extends Model<MeasurementsOptions<T>> {
  readonly width = $derived(this.options.width);
  readonly models = $derived(this.options.models);
  readonly gap = 5;

  readonly columns = $derived.by(() => {
    const width = this.width;
    if (width) {
      return Math.max(1, Math.floor(width / 150));
    }
  });

  readonly item = $derived.by(() => {
    const { width, columns, gap } = this;
    if (width && columns) {
      const w = width - gap * (columns - 1);
      const size = w / columns;
      return Math.floor(size);
    }
  });

  readonly size = $derived.by(() => {
    const { columns, item } = this;
    const items = this.models.length;
    if (columns && items && item) {
      const rows = Math.ceil(items / columns);
      const gap = this.gap;
      const scale = (value: number) => item * value + (value - 1) * gap;
      return {
        width: scale(columns),
        height: scale(rows),
      };
    }
  });

  positionFor(model: T): Point | undefined {
    const index = this.models.indexOf(model);
    const columns = this.columns;
    const item = this.item;
    if (item && columns) {
      const y = Math.floor(index / columns);
      const x = index - y * columns;
      const gap = this.gap;
      const scale = (value: number) => value * item + value * gap;
      return {
        x: scale(x),
        y: scale(y),
      };
    }
  }
}
