<script lang="ts" module>
  export type LoadedModel = {
    isLoaded: boolean;
  };
</script>

<script lang="ts">
  import type { Snippet } from "svelte";

  let { model, children }: { model: LoadedModel | undefined; children: Snippet; } = $props();

  let isLoaded = $state(false);

  $effect.pre(() => {
    if(model?.isLoaded) {
      isLoaded = true;
    }
  });
</script>

{#if isLoaded}
  {@render children()}
{/if}
