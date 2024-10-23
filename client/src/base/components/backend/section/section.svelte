<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { createSectionContext } from './models.svelte';
  import { getter } from '$base/lib/utils/options';
  import Icon from '$base/components/dark/icon.svelte';

  let {
    icon,
    title,
    sidebar,
    accessories,
    children,
  }: {
    icon: Component;
    title: string;
    sidebar: Snippet | undefined;
    accessories: Snippet | undefined;
    children: Snippet;
  } = $props();

  createSectionContext({ icon: getter(() => icon) });
</script>

<div class="section">
  {#if sidebar}
    <div class="sidebar">
      <div class="header">
        <div class="content">
          <Icon {icon} />
          {title}
        </div>
        {#if accessories}
          <div class="accessories">
            {@render accessories()}
          </div>
        {/if}
      </div>
      <div class="content">
        {@render sidebar()}
      </div>
    </div>
  {/if}
  <div class="content">{@render children()}</div>
</div>

<style lang="scss">
  .section {
    flex: 1;
    display: flex;
    flex-direction: row;
    > .sidebar {
      width: 200px;
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--dark-border-color-1);
      > .header {
        display: flex;
        flex-direction: row;
        gap: 10px;
        padding: 0 10px;
        min-height: 32px;
        border-bottom: 1px solid var(--dark-border-color-1);
        align-items: center;
        > .content {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          flex: 1;
        }
        > .accessories {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 5px;
        }
      }
      > .content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
