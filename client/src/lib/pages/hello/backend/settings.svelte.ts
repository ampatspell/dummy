import { isLoaded } from '$dummy/lib/firebase/fire/utils.svelte';
import { mapGalleryById } from '$dummy/lib/galleries/gallery.svelte';
import { PageSettingsModel } from '$dummy/lib/pages/page.svelte';
import { existing } from '$dummy/lib/utils/existing';
import { getter } from '$dummy/lib/utils/options';
import { Properties, type PropertiesOptions, Property } from '$dummy/lib/utils/property.svelte';

export type HelloPageSettings = {
  title: string;
  gallery?: string;
  imagePadding?: number;
};

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

  imagePadding = new Property<number | undefined>({
    delegate: this,
    value: getter(() => this.data.imagePadding),
    update: (value) => (this.data.imagePadding = value),
  });

  gallery = new Property<string | undefined>({
    delegate: this,
    value: getter(() => this.data.gallery),
    update: (value) => (this.data.gallery = value),
  });
}

export class HelloPageSettingsModel extends PageSettingsModel<HelloPageSettings> {
  properties = new HelloPageSettingsPropertiesModel({
    settings: this,
    didUpdate: () => this.save(),
  });

  title = $derived(this.data.title);
  imagePadding = $derived(this.data.imagePadding);

  __gallery = mapGalleryById({
    id: getter(() => this.data.gallery),
  });

  _gallery = $derived(this.__gallery.content);

  gallery = $derived(existing(this._gallery));

  isLoaded = $derived(isLoaded([this._gallery]));
  dependencies = [this.__gallery];
}
