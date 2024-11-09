<script lang="ts">
  import { subscribe } from "$dummy/lib/firebase/fire/subscriber.svelte";
  import { buildSiteModel } from "$dummy/lib/site/site.svelte";

  let site = buildSiteModel();
  $effect(() => subscribe(site));

  let isLoaded = $derived(site.isLoaded);
  let layout = $derived(site.layout);
  let definition = $derived(layout?.definition);
  let Component = $derived(definition?.frontend);
</script>

<div class="page">
  {#if isLoaded}
    {#if layout}
      {#if Component}
        <Component {layout}>
          Hello
        </Component>
      {/if}
    {/if}
  {/if}
</div>

<style lang="scss">
  .page {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
</style>
