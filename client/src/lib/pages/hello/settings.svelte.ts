import { PageSettingsModel } from '$base/lib/pages/page.svelte';
import { getter } from '$base/lib/utils/options';
import { Properties, Property, type PropertiesOptions } from '$base/lib/utils/property.svelte';
import type { HelloPageSettings } from '../definition.svelte';

export type HelloPageSettingsPropertiesModelOptions = {
  settings: HelloPageSettingsModel;
} & PropertiesOptions;

export class HelloPageSettingsPropertiesModel extends Properties<HelloPageSettingsPropertiesModelOptions> {
  data = $derived(this.options.settings.data);

  title = new Property<string>({
    delegate: this,
    value: getter(() => this.data.title),
    update: (value) => (this.data.title = value),
  });

  fontSize = new Property<number | undefined>({
    delegate: this,
    value: getter(() => this.data.fontSize),
    update: (value) => (this.data.fontSize = value),
  });
}

export class HelloPageSettingsModel extends PageSettingsModel<HelloPageSettings> {
  properties = new HelloPageSettingsPropertiesModel({
    settings: this,
    didUpdate: () => this.save(),
  });

  title = $derived(this.data.title);
  fontSize = $derived(this.data.fontSize);
}
