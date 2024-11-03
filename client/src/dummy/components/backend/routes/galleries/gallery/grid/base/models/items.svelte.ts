import { removeObject } from '$dummy/lib/utils/array';
import { options, type OptionsInput } from '$dummy/lib/utils/options';

export type GridContextRegisterItemOptions<T> = {
  model: T;
  element: HTMLDivElement | undefined;
};

export class GridContextItems<T> {
  private registrations: GridContextRegisterItemOptions<T>[] = [];

  registerItem(_opts: OptionsInput<GridContextRegisterItemOptions<T>>) {
    const opts = options(_opts);
    this.registrations.push(opts);
    return () => {
      removeObject(this.registrations, opts);
    };
  }

  getRegistration(el: HTMLElement) {
    let current: HTMLElement | null = el;
    const registrations = this.registrations;
    while (current) {
      const item = registrations.find((item) => item.element === current);
      if (item) {
        return {
          element: item.element!,
          model: item.model,
        };
      }
      current = current.parentElement;
    }
  }
}
