<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import type { Component, Snippet } from 'svelte';

  let {
    title,
    icon,
    children,
  }: {
    title: string;
    icon: Component;
    children?: Snippet;
  } = $props();
</script>

<div class="page">
  <div class="header">
    <div class="section left">
      <Icon {icon} />
      <div class="title">{title}</div>
    </div>
  </div>
  <div class="content">
    {#if children}
      {@render children()}
    {:else}
      <div class="placeholder"><Icon {icon} size="large" /></div>
    {/if}
  </div>
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .header {
      display: flex;
      flex-direction: row;
      gap: 10px;
      border-bottom: 1px solid var(--dark-border-color-1);
      > .section {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px;
        gap: 10px;
        &.left {
          flex: 1;
          > .title {
            font-weight: 600;
          }
        }
      }
    }
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      > .placeholder {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0.1;
      }
    }
  }
</style>
