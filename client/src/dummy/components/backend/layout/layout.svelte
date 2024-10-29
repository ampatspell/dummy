<script lang="ts">
  import type { Snippet } from 'svelte';
  import Sidebar from './sidebar/sidebar.svelte';
  import { getSession } from '$dummy/lib/session/session.svelte';

  let { route, children }: { route: string; children: Snippet } = $props();
  let session = getSession();
  let isAdmin = $derived(session.user?.isAdmin ?? false);
</script>

<div class="layout">
  {#if isAdmin}
    <div class="sidebar">
      <Sidebar {route} />
    </div>
  {/if}
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
