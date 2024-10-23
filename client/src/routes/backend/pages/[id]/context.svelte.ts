import { buildPageByIdModel } from '$base/lib/pages/page.svelte';
import { createContext } from '$base/lib/utils/context';
import { options, type OptionsInput } from '$base/lib/utils/options';

export type PageContextOptions = {
  id: string;
};

export class PageContext {
  private readonly options: PageContextOptions;
  constructor(opts: OptionsInput<PageContextOptions>) {
    this.options = options(opts);
  }

  readonly id = $derived.by(() => this.options.id);

  readonly page = $derived.by(() =>
    buildPageByIdModel({
      id: this.id,
    }),
  );
}

const { get: getPageContext, set: setPageContext } = createContext<PageContext>('layout-page');

export const createPageContext = (opts: OptionsInput<PageContextOptions>) => {
  return setPageContext(new PageContext(opts));
};

export { getPageContext };
