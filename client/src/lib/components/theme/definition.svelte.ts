import type { LayoutModelOptions } from '$lib/components/layout/models/layout.svelte';
import { HamsterBlockModel } from '$lib/components/theme/blocks/hamster/models.svelte';
import Theme from '$lib/components/theme/theme.svelte';
import { IntroBlockModel } from './blocks/intro/models.svelte';

export const definition: LayoutModelOptions = {
  theme: Theme,
  blocks: [
    {
      type: 'hamster',
      factory: HamsterBlockModel,
    },
    {
      type: 'intro',
      factory: IntroBlockModel,
    },
  ],
};
