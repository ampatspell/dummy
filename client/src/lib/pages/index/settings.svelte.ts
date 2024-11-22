import { PageSettingsModel } from '$dummy/lib/pages/page.svelte';

export type IndexPageSettings = Record<string, never>;

export class IndexPageSettingsModel extends PageSettingsModel<IndexPageSettings> {
  isLoaded = true;
  async load() {}
}
