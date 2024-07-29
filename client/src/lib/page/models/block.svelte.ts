import type { Document } from "$lib/firebase/fire/document.svelte";
import { Model } from "$lib/firebase/fire/model.svelte";
import type { BlockData } from "./data";

export type BlockModelOptions = {
  doc: Document<BlockData>;
};

export class BlockModel extends Model<BlockModelOptions> {
  doc = $derived(this.options.doc);
  id = $derived(this.doc.id);
  type = $derived(this.doc.data?.type);
}

export class TextBlockModel extends BlockModel {}
export class PlaceholderBlockModel extends BlockModel {}
export class GridBlockModel extends BlockModel {}

export const createBlockModel = (opts: BlockModelOptions) => {
  switch(opts.doc.data?.type) {
    case 'text': return new TextBlockModel(opts);
    case 'placeholder': return new PlaceholderBlockModel(opts);
    case 'grid': return new GridBlockModel(opts);
  }
}
