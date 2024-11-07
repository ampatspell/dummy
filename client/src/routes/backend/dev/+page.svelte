<script lang="ts">
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import { buildSiteModel } from '$dummy/lib/site/site.svelte';
  import { setGlobal } from '$dummy/lib/utils/set-global';

  let site = buildSiteModel();
  $effect(() => subscribe(site));

  setGlobal({ site });
</script>

<div class="page">
  {site}
</div>

<style lang="scss">
  .page {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
</style>
