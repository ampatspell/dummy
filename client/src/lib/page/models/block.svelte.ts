import type { Document } from "$lib/firebase/fire/document.svelte";
import { Model } from "$lib/firebase/fire/model.svelte";
import type { BlockData } from "./data";

export type BlockModelOptions = {
  doc: Document<BlockData>;
};

export class BlockModel extends Model<BlockModelOptions> {
}
