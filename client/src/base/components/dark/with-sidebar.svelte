<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    sidebar,
    children,
  }: {
    sidebar: Snippet;
    children: Snippet;
  } = $props();
</script>

<div class="foof">
  <div class="sidebar">{@render sidebar()}</div>
  <div class="content">{@render children()}</div>
</div>

<style lang="scss">
  .foof {
    flex: 1;
    display: flex;
    flex-direction: row;
    > .sidebar {
      width: 200px;
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--dark-border-color-1);
    }
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
