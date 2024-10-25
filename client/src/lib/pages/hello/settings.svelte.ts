import { MapModel } from '$base/lib/firebase/fire/models.svelte';
import { buildGalleryByIdModel } from '$base/lib/galleries/gallery.svelte';
import { PageSettingsModel } from '$base/lib/pages/page.svelte';
import { getter } from '$base/lib/utils/options';
import { Properties, Property, type PropertiesOptions } from '$base/lib/utils/property.svelte';

export type HelloPageSettings = {
  title: string;
  fontSize?: number;
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

  fontSize = new Property<number | undefined>({
    delegate: this,
    value: getter(() => this.data.fontSize),
    update: (value) => (this.data.fontSize = value),
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
  fontSize = $derived(this.data.fontSize);
  imagePadding = $derived(this.data.imagePadding);

  _gallery = new MapModel({
    source: getter(() => this.data.gallery),
    target: (id) => buildGalleryByIdModel({ id }),
  });

  gallery = $derived(this._gallery.content);

  isLoaded = $derived(this.gallery?.isLoaded ?? true);

  dependencies = [this._gallery];
}
