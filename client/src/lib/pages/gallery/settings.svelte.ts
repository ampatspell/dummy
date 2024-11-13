import type { GridAlignment } from '$dummy/components/frontend/blocks/galleries/grid/grid.svelte';
import { isLoaded } from '$dummy/lib/firebase/fire/utils.svelte';
import { GalleryByIdModel } from '$dummy/lib/galleries/gallery.svelte';
import { PageSettingsModel } from '$dummy/lib/pages/page.svelte';
import type { AspectRatio } from '$dummy/lib/utils/aspect-ratio';
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

  introduction = new Property<string | undefined>({
    delegate: this,
    value: getter(() => this.data.introduction),
    update: (value) => (this.data.introduction = value),
  });

  gallery = new Property<string | undefined>({
    delegate: this,
    value: getter(() => this.data.gallery),
    update: (value) => (this.data.gallery = value),
  });

  aspectRatio = new Property<AspectRatio | undefined>({
    delegate: this,
    value: getter(() => this.data.aspectRatio),
    update: (value) => (this.data.aspectRatio = value),
  });

  gridAlignment = new Property<GridAlignment | undefined>({
    delegate: this,
    value: getter(() => this.data.gridAlignment),
    update: (value) => (this.data.gridAlignment = value),
  });

  gridCaptions = new Property<boolean | undefined>({
    delegate: this,
    value: getter(() => this.data.gridCaptions),
    update: (value) => (this.data.gridCaptions = value),
  });

  lightboxCaptions = new Property<boolean | undefined>({
    delegate: this,
    value: getter(() => this.data.lightboxCaptions),
    update: (value) => (this.data.lightboxCaptions = value),
  });
}

export type GalleryPageSettings = {
  title: string;
  introduction?: string;
  gallery?: string;
  aspectRatio?: AspectRatio;
  gridAlignment?: GridAlignment;
  gridCaptions?: boolean;
  lightboxCaptions?: boolean;
};

export class GalleryPageSettingsModel extends PageSettingsModel<GalleryPageSettings> {
  readonly properties = new GalleryPageSettingsPropertiesModel({
    settings: this,
    didUpdate: () => this.save(),
  });

  readonly title = $derived(this.data.title);
  readonly introduction = $derived(this.data.introduction);
  readonly aspectRatio = $derived(this.data.aspectRatio);
  readonly gridAlignment = $derived(this.data.gridAlignment);
  readonly gridCaptions = $derived(this.data.gridCaptions ?? false);
  readonly lightboxCaptions = $derived(this.data.lightboxCaptions ?? false);

  readonly _gallery = new GalleryByIdModel({ id: getter(() => this.data.gallery) });
  readonly gallery = $derived(this._gallery.existing);

  isLoaded = $derived(isLoaded([this._gallery]));
  dependencies = [this._gallery];
}
