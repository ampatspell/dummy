<script lang="ts" module>
  export type LoadedModel = {
    isLoaded: boolean;
    exists: boolean | undefined;
  };
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import Placeholder from './placeholder.svelte';

  let {
    model,
    placeholder,
    children,
  }: {
    model?: LoadedModel;
    placeholder: string;
    children?: Snippet;
  } = $props();

  let isLoaded = $derived(model?.isLoaded ?? false);
  let exists = $derived(model?.exists ?? false);
</script>

{#if isLoaded}
  {#if exists}
    {@render children?.()}
  {:else}
    <Placeholder label={placeholder} />
  {/if}
{/if}
