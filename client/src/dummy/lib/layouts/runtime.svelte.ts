import { Subscribable } from "../firebase/fire/model.svelte";
import { isLoaded } from "../firebase/fire/utils.svelte";
import type { SiteModel } from "../site/site.svelte";
import { assertDefined } from "../utils/assert";
import type { LayoutSettingsModel } from "./layout.svelte";

export type LayoutRuntimeModelOptions = {
  site: SiteModel;
};

export class LayoutRuntimeModel extends Subscribable<LayoutRuntimeModelOptions> {
  readonly site = $derived(this.options.site);
  readonly layout = $derived(this.site.layout);
  readonly definition = $derived(this.layout?.definition);

  settingsAs<T extends LayoutSettingsModel>(): T {
    return assertDefined(this.layout, this, 'layout').settingsAs<T>();
  }

  readonly isLoaded = $derived(isLoaded([this.site]));
  readonly dependencies = [this.site];

  async load() {
    await this.site.load();
  }
}
