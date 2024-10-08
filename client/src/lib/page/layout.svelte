<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutDefinition } from './models/layout.svelte';

  let {
    definition,
    children
  }: {
    definition: LayoutDefinition;
    children: Snippet;
  } = $props();

  let Theme = $derived(definition.theme);
</script>

<Theme>
  {@render children()}
</Theme>
