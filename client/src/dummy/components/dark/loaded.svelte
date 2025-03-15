<script lang="ts" module>
  export type LoadedModel = {
    isLoaded: boolean;
  };
</script>

<script lang="ts">
  import { browser } from '$app/environment';
  import type { Snippet } from 'svelte';

  let { model, children }: { model: LoadedModel | undefined; children: Snippet } = $props();

  let isLoaded = $state(browser ? false : true);

  $effect.pre(() => {
    if (model?.isLoaded) {
      isLoaded = true;
    }
  });
</script>

{#if isLoaded}
  {@render children()}
{/if}
