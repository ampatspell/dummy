import { isLoaded } from '$dummy/lib/firebase/fire/utils.svelte';
import { GalleryByIdModel } from '$dummy/lib/galleries/gallery.svelte';
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
  readonly properties = new GalleryPageSettingsPropertiesModel({
    settings: this,
    didUpdate: () => this.save(),
  });

  readonly _gallery = new GalleryByIdModel({ id: getter(() => this.data.gallery) });

  readonly gallery = $derived(this._gallery.existing);

  isLoaded = $derived(isLoaded([this._gallery]));
  dependencies = [this._gallery];
}
