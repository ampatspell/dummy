<script lang="ts">
  import type { Snippet } from 'svelte';
  import { LayoutContext, setLayoutContext, type LayoutDefinition } from './models/layout.svelte';

  let {
    definition,
    children,
  }: {
    definition: LayoutDefinition;
    children: Snippet;
  } = $props();

  let context = setLayoutContext(new LayoutContext(definition));
  let Theme = $derived(context.theme);
</script>

<Theme>
  {@render children()}
</Theme>
