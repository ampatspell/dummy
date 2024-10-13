<script lang="ts">
  import Block from '$lib/components/blocks/block/block.svelte';
  import type { BlockModel } from '$lib/components/blocks/block/models/block.svelte';
  import type { GalleryBlockModel } from './models.svelte';

  let props: { block: BlockModel } = $props();
  let block = $derived(props.block as GalleryBlockModel);

  let header = $derived(block.header.content);
  let footer = $derived(block.footer.content);
</script>

<div class="gallery">
  {#if header}
    <div class="header">
      <Block block={header} />
    </div>
  {/if}

  Content

  {#if footer}
    <div class="footer">
      <Block block={footer} />
    </div>
  {/if}
</div>

<style lang="scss">
  .gallery {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
