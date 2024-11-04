import { removeObject } from '$dummy/lib/utils/array';
import { options, type OptionsInput } from '$dummy/lib/utils/options';

export type ItemRegistration<T> = {
  model: T;
  element: HTMLElement;
};

export type ItemsOptions<T> = {
  model: T;
  element: HTMLElement | undefined;
};

export class Items<T> {
  private registrations: ItemsOptions<T>[] = [];

  registerItem(_opts: OptionsInput<ItemsOptions<T>>) {
    const opts = options(_opts);
    this.registrations.push(opts);
    return () => {
      removeObject(this.registrations, opts);
    };
  }

  getRegistration(el: HTMLElement): ItemRegistration<T> | undefined {
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
