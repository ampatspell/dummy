import { buildLayoutByIdModel } from '$dummy/lib/layouts/layout.svelte';
import { createContext } from '$dummy/lib/utils/context';
import { options, type OptionsInput } from '$dummy/lib/utils/options';

export type LayoutContextOptions = {
  id: string;
};

export class LayoutContext {
  private readonly options: LayoutContextOptions;
  constructor(opts: OptionsInput<LayoutContextOptions>) {
    this.options = options(opts);
  }

  readonly id = $derived.by(() => this.options.id);

  readonly layout = $derived.by(() => {
    return buildLayoutByIdModel({
      id: this.id,
    });
  });
}

const { get: getLayoutContext, set: setLayoutContext } = createContext<LayoutContext>('layout-layout');

export const createLayoutContext = (opts: OptionsInput<LayoutContextOptions>) => {
  return setLayoutContext(new LayoutContext(opts));
};

export { getLayoutContext };
