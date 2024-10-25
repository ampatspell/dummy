import type { ModalsContext } from '$base/components/dark/modals/models/context.svelte';
import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
import type { OptionsInput } from '$base/lib/utils/options';
import Component from './component.svelte';

export type GalleryUploadModalProps = {
  gallery: GalleryModel;
};

export type GalleryUploadModalResolution = boolean;

export const openGalleryUploadModal = (modals: ModalsContext, props: OptionsInput<GalleryUploadModalProps>) => {
  return modals.open({
    component: Component,
    props,
    block: true,
    dismissible: false,
  });
};
