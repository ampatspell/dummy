import { LayoutSettingsModel } from '$dummy/lib/layouts/layout.svelte';
import { data, DataModelProperties } from '$dummy/lib/utils/property.svelte';

export type DummyLayoutSettings = {
  title: string;
};

export class DummyLayoutSettingsPropertiesModel extends DataModelProperties<DummyLayoutSettings> {
  title = data(this, 'title');
}

export class DummyLayoutSettingsModel extends LayoutSettingsModel<DummyLayoutSettings> {
  isLoaded = true;

  properties = new DummyLayoutSettingsPropertiesModel({
    model: this,
  });

  title = $derived(this.data.title);
}
