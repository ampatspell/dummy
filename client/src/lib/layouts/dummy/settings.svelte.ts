import { LayoutSettingsModel } from '$dummy/lib/layouts/layout.svelte';
import { data, Properties, type PropertiesOptions } from '$dummy/lib/utils/property.svelte';

export type DummyLayoutSettingsPropertiesModelOptions = {
  settings: DummyLayoutSettingsModel;
} & PropertiesOptions;

export class DummyLayoutSettingsPropertiesModel extends Properties<DummyLayoutSettingsPropertiesModelOptions> {
  data = $derived(this.options.settings.data);
  title = data(this, 'title');
}

export type DummyLayoutSettings = {
  title: string;
};

export class DummyLayoutSettingsModel extends LayoutSettingsModel<DummyLayoutSettings> {
  isLoaded = true;

  properties = new DummyLayoutSettingsPropertiesModel({
    settings: this,
    didUpdate: () => this.save(),
  });

  title = $derived(this.data.title);
}
