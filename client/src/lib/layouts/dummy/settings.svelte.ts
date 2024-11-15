import { isLoaded } from '$dummy/lib/firebase/fire/utils.svelte';
import { LayoutSettingsModel } from '$dummy/lib/layouts/layout.svelte';
import { BasePagesByIdsModel } from '$dummy/lib/pages/pages.svelte';
import { getter } from '$dummy/lib/utils/options';
import { data, DataModelProperties } from '$dummy/lib/utils/property.svelte';

export type DummyLayoutSettings = {
  title: string;
  pages: string[];
};

export class DummyLayoutSettingsPropertiesModel extends DataModelProperties<DummyLayoutSettings> {
  readonly title = data(this, 'title');
  readonly pages = data(this, 'pages');
}

export class DummyLayoutSettingsModel extends LayoutSettingsModel<DummyLayoutSettings> {
  readonly properties = new DummyLayoutSettingsPropertiesModel({
    model: this,
  });

  readonly title = $derived(this.data.title);

  readonly _pages = new BasePagesByIdsModel({
    ids: getter(() => this.data.pages),
  });

  readonly pages = $derived(this._pages.existing);

  readonly dependencies = [this._pages];
  readonly isLoaded = $derived(isLoaded([this._pages]));
}
