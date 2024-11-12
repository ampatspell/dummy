<script lang="ts">
  import './frontend.scss';
  import type { Snippet } from 'svelte';
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import type { DummyLayoutSettingsModel } from './settings.svelte';

  let {
    runtime,
    children,
  }: {
    runtime: PageRuntimeModel;
    children: Snippet;
  } = $props();

  let settings = $derived(runtime.layout.settingsAs<DummyLayoutSettingsModel>());
  let title = $derived(settings.title);

  let divider = $state(false);
  let onscroll = () => {
    divider = window.scrollY > 0;
  };
</script>

<svelte:window {onscroll} />

<div class="dummy">
  <div class="header" class:divider>
    <div class="left">
      <a href="/">{title}</a>
    </div>
    <div class="right"></div>
  </div>
  <div class="content">
    {@render children()}
  </div>
</div>

<style lang="scss">
  .dummy {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: var(--dummy-font-family);
    font-size: var(--dummy-font-size);
    font-weight: var(--dummy-font-weight);
    cursor: default;
    padding-top: var(--dummy-header-height);
    > .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 0 15px;
      height: var(--dummy-header-height);
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
      background: #fff;
      border-bottom: 1px solid transparent;
      transition: 0.2s ease-in-out border-bottom-color;
      > .left {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        > a {
          font-weight: 500;
          text-decoration: none;
          font-size: 24px;
        }
      }
      > .right {
        flex: 1;
        display: flex;
        flex-direction: row;
      }
      &.divider {
        border-bottom-color: #eee;
      }
    }
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
