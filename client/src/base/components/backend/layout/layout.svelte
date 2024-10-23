<script lang="ts">
  import type { Snippet } from 'svelte';
  import Sidebar from './sidebar/sidebar.svelte';

  let { route, children }: { route: string; children: Snippet } = $props();
</script>

<div class="layout">
  <div class="sidebar">
    <Sidebar {route} />
  </div>
  <div class="content">
    {@render children()}
  </div>
</div>

<style lang="scss">
  .layout {
    flex: 1;
    display: flex;
    flex-direction: row;
    > .sidebar {
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
