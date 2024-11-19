import type { ModalsContext } from '$dummy/components/dark/modals/base/context.svelte';
import type { FolderModel } from '$dummy/lib/assets/folder.svelte';
import type { OptionsInput } from '$dummy/lib/utils/options';
import Component from './component.svelte';

export type FolderUploadModalProps = {
  folder: FolderModel;
};

export type FolderUploadModalResolution = boolean;

export const openFolderUploadModal = (modals: ModalsContext, props: OptionsInput<FolderUploadModalProps>) => {
  return modals.open({
    component: Component,
    props,
  });
};
