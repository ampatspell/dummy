<script lang="ts">
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import { buildLayoutsModel } from '$dummy/lib/layouts/layouts.svelte';
  import { setGlobal } from '$dummy/lib/utils/set-global';

  let layouts = buildLayoutsModel();
  $effect(() => subscribe(layouts));

  setGlobal({ layouts });
</script>

<div class="page">
  {#each layouts.all as layout}
    {@const Frontend = layout.definition?.frontend}
    <div class="row">
      <Frontend>
        {layout}
        {layout.definition}
      </Frontend>
    </div>
  {/each}
</div>

<style lang="scss">
  .page {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
</style>
