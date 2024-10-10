import { Model } from '$lib/firebase/fire/model.svelte';
import type { CollectionReference } from '@firebase/firestore';
import type { BlocksDefinitionModel } from './definition.svelte';

export type BlocksModelOptions = {
  definition: BlocksDefinitionModel;
  collection: CollectionReference | undefined;
};

export class BlocksModel extends Model<BlocksModelOptions> {}
