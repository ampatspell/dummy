import { Model } from '$lib/firebase/fire/model.svelte';
import type { BlocksModel } from '../../models/blocks.svelte';
import { update, type Document, type UpdateCallback } from '$lib/firebase/fire/document.svelte';
import { serialized } from '$lib/utils/object';
import { MapModels } from '$lib/firebase/fire/models.svelte';
import { getter } from '$lib/utils/options';
import type { BlockDefinitionPropModel } from '../../models/definition.svelte';
import { Property } from '$lib/utils/property.svelte';

export type BlockProps = {
  [key: string]: PropValue;
};

export type PropValue = StringPropValue | BlockPropValue;

export type BlockPropValue = {
  id?: string;
};

export type StringPropValue = {
  value?: string;
};

export type BlockData = {
  definition: string;
  properties: BlockProps;
};

export type BlockModelOptions = {
  blocks: BlocksModel;
  doc: Document<BlockData>;
};

export class BlockModel extends Model<BlockModelOptions> {
  _doc = $derived(this.options.doc);
  data = $derived(this._doc.data);

  id = $derived(this._doc.id);
  exists = $derived(this._doc.exists);
  isEditing = $derived(this.options.blocks.isEditing);

  definition = $derived.by(() => {
    const id = this.data?.definition;
    if (id) {
      return this.options.blocks.definition.byId(id);
    }
  });

  properties = new BlockPropertiesModel({
    block: this,
  });

  update = (cb: UpdateCallback<BlockData>) => update(this._doc, cb);

  serialized = $derived(serialized(this, ['id', 'definition']));
}

export type BlockPropertiesModelOptions = {
  block: BlockModel;
};

export class BlockPropertiesModel extends Model<BlockPropertiesModelOptions> {
  isEditing = $derived(this.options.block.isEditing);

  _all = new MapModels({
    source: getter(() => this.options.block.definition?.props.all ?? []),
    target: (definition) => {
      return new BlockPropertyModel({ properties: this, definition });
    },
  });

  data = $derived(this.options.block.data?.properties || {});

  update(cb: UpdateCallback<BlockProps>) {
    this.options.block.update((data) => {
      cb(data.properties);
    });
  }

  all = $derived(this._all.content);

  byId(id: string) {
    return this.all.find((property) => property.id === id);
  }
}

export type BlockPropertyModelOptions = {
  properties: BlockPropertiesModel;
  definition: BlockDefinitionPropModel;
};

export class BlockPropertyModel extends Model<BlockPropertyModelOptions> {
  definition = $derived(this.options.definition);
  properties = $derived(this.options.properties);
  isEditing = $derived(this.properties.isEditing);

  id = $derived(this.definition.id);
  type = $derived(this.definition.type);

  data = $derived(this.properties.data[this.id] ?? {});

  update(value: PropValue) {
    this.properties.update((data) => {
      data[this.id] = value;
    });
  }

  value = $derived.by(() => {
    const type = this.type;
    const opts = {
      property: this,
    };
    switch (type) {
      case 'string':
        return new BlockPropertyStringValueModel(opts);
      case 'block':
        return new BlockPropertyBlockValueModel(opts);
    }
  });
}

export type BlockPropertyValueModelOptions = {
  property: BlockPropertyModel;
};

export abstract class BlockPropertyValueModel<
  O extends BlockPropertyValueModelOptions = BlockPropertyValueModelOptions,
> extends Model<O> {
  isDisabled = $derived(!this.options.property.isEditing);

  update(value: PropValue) {
    this.options.property.update(value);
  }
}

export class BlockPropertyStringValueModel extends BlockPropertyValueModel {
  data = $derived(this.options.property.data as StringPropValue);

  property = new Property<string | undefined>({
    delegate: this,
    value: getter(() => this.data.value),
    update: (value?: string) => this.update({ value }),
  });

  value = $derived(this.data.value);
}
export class BlockPropertyBlockValueModel extends BlockPropertyValueModel {}
