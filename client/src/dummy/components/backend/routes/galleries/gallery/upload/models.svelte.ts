import type { ModalsContext } from '$dummy/components/dark/modals/base/context.svelte';
import type { GalleryModel } from '$dummy/lib/assets/gallery.svelte';
import type { OptionsInput } from '$dummy/lib/utils/options';
import Component from './component.svelte';

export type GalleryUploadModalProps = {
  gallery: GalleryModel;
};

export type GalleryUploadModalResolution = boolean;

export const openGalleryUploadModal = (modals: ModalsContext, props: OptionsInput<GalleryUploadModalProps>) => {
  return modals.open({
    component: Component,
    props,
  });
};
