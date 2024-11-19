<script lang="ts">
  import type { Component } from 'svelte';
  import Item from './item.svelte';
  import LucideImages from '$dummy/components/icons/lucide--images.svelte';
  import LucideActivity from '$dummy/components/icons/lucide--activity.svelte';
  import LucideFlame from '$dummy/components/icons/lucide--flame.svelte';
  import LucideNotebookText from '$dummy/components/icons/lucide--notebook-text.svelte';
  import LucideLayers from '$dummy/components/icons/lucide--layers.svelte';
  import LucideSettings from '$dummy/components/icons/lucide--settings.svelte';

  let { route }: { route: string } = $props();

  let startsWith = (item: string) => route.startsWith(item);
  let equals = (item: string) => route === item;

  type ItemProps = {
    icon: Component;
    route: string;
    current: (item: string) => boolean;
  };

  let top = [
    {
      icon: LucideFlame,
      route: '/',
      current: equals,
    },
    {
      icon: LucideActivity,
      route: '/backend',
      current: equals,
    },
    {
      icon: LucideLayers,
      route: '/backend/layouts',
      current: startsWith,
    },
    {
      icon: LucideNotebookText,
      route: '/backend/pages',
      current: startsWith,
    },
    {
      icon: LucideImages,
      route: '/backend/assets',
      current: startsWith,
    },
  ];

  let bottom = [
    {
      icon: LucideSettings,
      route: '/backend/settings',
      current: startsWith,
    },
  ];
</script>

{#snippet items(array: ItemProps[])}
  {#each array as item}
    <Item icon={item.icon} route={item.route} isCurrent={item.current(item.route)} />
  {/each}
{/snippet}

<div class="sidebar">
  <div class="content">
    <div class="section">
      {@render items(top)}
    </div>
    <div class="section">
      {@render items(bottom)}
    </div>
  </div>
</div>

<style lang="scss">
  .sidebar {
    --size: 32px;
    width: var(--size);
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    > .content {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: var(--size);
      display: flex;
      flex-direction: column;
      > .section {
        display: flex;
        flex-direction: column;
        &:first-child {
          flex: 1;
        }
      }
    }
  }
</style>
