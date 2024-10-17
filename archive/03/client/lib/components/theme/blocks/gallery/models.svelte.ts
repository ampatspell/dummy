import { BlockModel, type BlockData, type BlockReferenceData } from '$lib/components/blocks/block/models/block.svelte';
import { BlockReference } from '$lib/components/blocks/block/models/reference.svelte';
import { getter } from '$lib/utils/options';
import Component from './component.svelte';
import Inspector from './inspector.svelte';

export type GalleryBlockData = BlockData & {
  type: 'gallery';
  header?: BlockReferenceData;
  footer?: BlockReferenceData;
};

export class GalleryBlockModel extends BlockModel<GalleryBlockData> {
  component = Component;
  inspector = Inspector;

  header = new BlockReference({
    isEditing: getter(() => this.isEditing),
    blocks: getter(() => this.blocks),
    data: getter(() => this._data.header),
    update: (value?: BlockReferenceData) => {
      this.update((data) => {
        data.header = value;
      });
    },
  });

  footer = new BlockReference({
    isEditing: getter(() => this.isEditing),
    blocks: getter(() => this.blocks),
    data: getter(() => this._data.footer),
    update: (value?: BlockReferenceData) => {
      this.update((data) => {
        data.footer = value;
      });
    },
  });
}
