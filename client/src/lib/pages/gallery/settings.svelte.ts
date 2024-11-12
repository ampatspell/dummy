import { PageSettingsModel } from '$dummy/lib/pages/page.svelte';
import { getter } from '$dummy/lib/utils/options';
import { Properties, type PropertiesOptions, Property } from '$dummy/lib/utils/property.svelte';

export type GalleryPageSettingsPropertiesModelOptions = PropertiesOptions & {
  settings: GalleryPageSettingsModel;
};

export class GalleryPageSettingsPropertiesModel extends Properties<GalleryPageSettingsPropertiesModelOptions> {
  data = $derived(this.options.settings.data);

  title = new Property<string>({
    delegate: this,
    value: getter(() => this.data.title),
    update: (value) => (this.data.title = value),
  });

  gallery = new Property<string | undefined>({
    delegate: this,
    value: getter(() => this.data.gallery),
    update: (value) => (this.data.gallery = value),
  });
}

export type GalleryPageSettings = {
  title: string;
  gallery?: string;
};

export class GalleryPageSettingsModel extends PageSettingsModel<GalleryPageSettings> {
  isLoaded = true;
}
