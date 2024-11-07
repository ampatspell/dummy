import { Model } from '../firebase/fire/model.svelte';

export type LayoutDefinitionsModelOptions = {
  definitions: LayoutDefinitionModelOptions[];
};

export class LayoutDefinitionsModel extends Model<LayoutDefinitionsModelOptions> {}

export type LayoutDefinitionModelOptions = {
  id: string;
  name: string;
};

export class LayoutDefinitionModel extends Model<LayoutDefinitionModelOptions> {}
