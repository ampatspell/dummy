import { LayoutPageSettingsModel } from '$dummy/lib/layouts/layout.svelte';
import { getter } from '$dummy/lib/utils/options';
import { Properties, Property, type PropertiesOptions } from '$dummy/lib/utils/property.svelte';

export type HelloPageLayoutSettings = {
  fontSize?: number;
};

export type HelloPageLayoutSettingsPropertiesModelOptions = {
  settings: HelloPageLayoutSettingsModel;
} & PropertiesOptions;

export class HelloPageLayoutSettingsPropertiesModel extends Properties<HelloPageLayoutSettingsPropertiesModelOptions> {
  data = $derived(this.options.settings.data);

  fontSize = new Property<number | undefined>({
    delegate: this,
    value: getter(() => this.data.fontSize),
    update: (value) => (this.data.fontSize = value),
  });
}

export class HelloPageLayoutSettingsModel extends LayoutPageSettingsModel<HelloPageLayoutSettings> {
  properties = new HelloPageLayoutSettingsPropertiesModel({
    settings: this,
    didUpdate: () => this.save(),
  });

  fontSize = $derived(this.data.fontSize);

  isLoaded = true;
}
