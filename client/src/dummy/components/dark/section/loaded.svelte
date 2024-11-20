<script lang="ts" module>
  import type { LoadedModel } from '../loaded.svelte';
  export type LoadedAndExistsModel = LoadedModel & {
    exists: boolean | undefined;
  };
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import Placeholder from './placeholder.svelte';
  import Loaded from '../loaded.svelte';

  let {
    model,
    placeholder,
    children,
  }: {
    model?: LoadedAndExistsModel;
    placeholder: string;
    children?: Snippet;
  } = $props();

  let exists = $derived(model?.exists ?? false);
</script>

<Loaded {model}>
  {#if exists}
    {@render children?.()}
  {:else}
    <Placeholder label={placeholder} />
  {/if}
</Loaded>
