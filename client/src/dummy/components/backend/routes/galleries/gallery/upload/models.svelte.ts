import type { ModalsContext } from '$dummy/components/dark/modals/base/context.svelte';
import type { FolderModel } from '$dummy/lib/assets/folder.svelte';
import type { OptionsInput } from '$dummy/lib/utils/options';
import Component from './component.svelte';

export type GalleryUploadModalProps = {
  gallery: FolderModel;
};

export type GalleryUploadModalResolution = boolean;

export const openGalleryUploadModal = (modals: ModalsContext, props: OptionsInput<GalleryUploadModalProps>) => {
  return modals.open({
    component: Component,
    props,
  });
};
