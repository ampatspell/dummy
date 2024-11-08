import { Model } from '$dummy/lib/firebase/fire/model.svelte';
import { buildLayoutByIdModel } from '$dummy/lib/layouts/layout.svelte';
import type { SiteModel } from '$dummy/lib/site/site.svelte';
import { createContext } from '$dummy/lib/utils/context';
import { type OptionsInput } from '$dummy/lib/utils/options';

export type LayoutContextOptions = {
  id: string;
  site: SiteModel;
};

export class LayoutContext extends Model<LayoutContextOptions> {
  readonly id = $derived.by(() => this.options.id);

  readonly layout = $derived.by(() => {
    return buildLayoutByIdModel({
      id: this.id,
    });
  });

  readonly site = $derived(this.options.site);
}

const { get: getLayoutContext, set: setLayoutContext } = createContext<LayoutContext>('layout-layout');

export const createLayoutContext = (opts: OptionsInput<LayoutContextOptions>) => {
  return setLayoutContext(new LayoutContext(opts));
};

export { getLayoutContext };
