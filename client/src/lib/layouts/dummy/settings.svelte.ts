import { LayoutSettingsModel } from '$dummy/lib/layouts/layout.svelte';
import { getter } from '$dummy/lib/utils/options';
import { Properties, Property, type PropertiesOptions } from '$dummy/lib/utils/property.svelte';

export type DummyLayoutSettingsPropertiesModelOptions = {
  settings: DummyLayoutSettingsModel;
} & PropertiesOptions;

export class DummyLayoutSettingsPropertiesModel extends Properties<DummyLayoutSettingsPropertiesModelOptions> {
  data = $derived(this.options.settings.data);

  title = new Property<string>({
    delegate: this,
    value: getter(() => this.data.title),
    update: (value) => (this.data.title = value),
  });
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
}
