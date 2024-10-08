<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    title,
    children,
  }: {
    title?: string;
    children?: Snippet;
  } = $props();
</script>

<div class="section">
  {#if title}
    <div class="header">{title}</div>
  {/if}
  <div class="content">
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    > .header {
      padding: 10px;
      font-weight: 600;
    }
    > .content {
      display: flex;
      flex-direction: column;
    }
  }
</style>
