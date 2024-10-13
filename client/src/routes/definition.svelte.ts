import type { BlockDefinitionModelBlockOptions } from '$lib/components/blocks/models/definition.svelte';
import type { LayoutModelOptions } from '$lib/components/layout/models/layout.svelte';
import Hamster from '$lib/components/theme/blocks/hamster.svelte';
import Theme from '$lib/components/theme/theme.svelte';

export const hamsterDefinition: BlockDefinitionModelBlockOptions = {
  id: 'hamster',
  component: Hamster,
  props: [
    {
      id: 'greeting',
      type: 'string',
    },
    {
      id: 'emoji',
      type: 'string',
    },
  ],
};

export const definition: LayoutModelOptions = {
  theme: Theme,
  blocks: [hamsterDefinition],
};
