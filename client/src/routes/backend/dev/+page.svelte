<script lang="ts">
  import Grid from "$dummy/components/backend/routes/galleries/gallery/grid/grid.svelte";
  import Section from "$dummy/components/dark/section/section.svelte";
  import LucideFileTerminal from "$dummy/components/icons/lucide--file-terminal.svelte";
  import { subscribe } from "$dummy/lib/firebase/fire/subscriber.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let gallery = $derived(data.gallery);

  $effect(() => subscribe(gallery));
</script>


<Section title="Dev" icon={LucideFileTerminal}>
  <div class="page">
    <Grid {gallery} />
  </div>
</Section>

<style lang="scss">
  .page {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
</style>
