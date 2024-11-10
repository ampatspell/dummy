import { buildPageByIdModel } from '$dummy/lib/pages/page.svelte';
import { createContext } from '$dummy/lib/utils/context';
import { type OptionsInput, options } from '$dummy/lib/utils/options';

export type PageContextOptions = {
  id: string;
};

export class PageContext {
  private readonly options: PageContextOptions;
  constructor(opts: OptionsInput<PageContextOptions>) {
    this.options = options(opts);
  }

  readonly id = $derived.by(() => this.options.id);

  readonly page = $derived.by(() => {
    return buildPageByIdModel({
      id: this.id,
    });
  });
}

const { get: getPageContext, set: setPageContext } = createContext<PageContext>('layout-page');

export const createPageContext = (opts: OptionsInput<PageContextOptions>) => {
  return setPageContext(new PageContext(opts));
};

export { getPageContext };
