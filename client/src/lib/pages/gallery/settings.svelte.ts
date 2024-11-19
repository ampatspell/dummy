import type { GridAlignment } from '$dummy/components/frontend/blocks/galleries/grid/grid.svelte';
import { GalleryByIdModel } from '$dummy/lib/assets/gallery.svelte';
import { isLoaded } from '$dummy/lib/firebase/fire/utils.svelte';
import { LayoutPageSettingsModel } from '$dummy/lib/layouts/layout.svelte';
import { PageSettingsModel } from '$dummy/lib/pages/page.svelte';
import { aspectRatioValues, type AspectRatio } from '$dummy/lib/utils/aspect-ratio';
import { getter } from '$dummy/lib/utils/options';
import { data, DataModelProperties } from '$dummy/lib/utils/property.svelte';

export class GalleryPageSettingsPropertiesModel extends DataModelProperties<GalleryPageSettings> {
  readonly title = data(this, 'title');
  readonly introduction = data(this, 'introduction');
  readonly gallery = data(this, 'gallery');
  readonly aspectRatio = data(this, 'aspectRatio');
  readonly gridAlignment = data(this, 'gridAlignment');
  readonly gridCaptions = data(this, 'gridCaptions');
  readonly lightboxCaptions = data(this, 'lightboxCaptions');
}

export type GalleryPageSettings = {
  readonly title: string;
  readonly introduction?: string;
  readonly gallery?: string;
  readonly aspectRatio: AspectRatio;
  readonly gridAlignment: GridAlignment;
  readonly gridCaptions: boolean;
  readonly lightboxCaptions: boolean;
};

export class GalleryPageSettingsModel extends PageSettingsModel<GalleryPageSettings> {
  readonly properties = new GalleryPageSettingsPropertiesModel({
    model: this,
  });

  readonly title = $derived(this.data.title);
  readonly introduction = $derived(this.data.introduction);
  readonly aspectRatio = $derived(aspectRatioValues[this.data.aspectRatio]);
  readonly gridAlignment = $derived(this.data.gridAlignment);
  readonly gridCaptions = $derived(this.data.gridCaptions);
  readonly lightboxCaptions = $derived(this.data.lightboxCaptions);

  readonly _gallery = new GalleryByIdModel({ id: getter(() => this.data.gallery) });
  readonly gallery = $derived(this._gallery.existing);

  readonly isLoaded = $derived(isLoaded([this._gallery]));
  readonly dependencies = [this._gallery];
}

export class GalleryPageLayoutPropertiesModel extends DataModelProperties<GalleryPageLayoutSettings> {
  readonly lightboxHeight = data(this, 'lightboxHeight');
}

export type GalleryPageLayoutSettings = {
  readonly lightboxHeight?: number;
};

export class GalleryPageLayoutSettingsModel extends LayoutPageSettingsModel<GalleryPageLayoutSettings> {
  readonly properties = new GalleryPageLayoutPropertiesModel({
    model: this,
  });

  readonly lightboxHeight = $derived(this.data.lightboxHeight);

  readonly isLoaded = true;
}
