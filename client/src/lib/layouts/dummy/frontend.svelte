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
  let layoutTitle = $derived(settings.title);
  let pages = $derived(settings.pages);

  let divider = $state(false);
  let onscroll = () => {
    divider = window.scrollY > 0;
  };

  let page = $derived(runtime.page);

  let title = $derived.by(() => {
    let pageTitle = page?.name ?? runtime.path;
    if (pageTitle === layoutTitle || runtime.path === '/') {
      return layoutTitle;
    }
    return `${layoutTitle} • ${pageTitle}`;
  });
</script>

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}
</svelte:head>

<svelte:window {onscroll} />

<div class="dummy">
  <div class="header" class:divider>
    <div class="left">
      <a href="/">{layoutTitle}</a>
    </div>
    <div class="right">
      {#each pages as page}
        <a href={page.url}>{page.name}</a>
      {/each}
    </div>
  </div>
  <div class="content">
    {@render children()}
  </div>
  <div class="footer">
    In one word, I am unbelievably fabulous artist with a fancy camera, pile of inheritance money and I shoot film.
    <a href="mailto:ampatspell@gmail.com">Any donations, no matter how big or small, are bigly appreciated.</a>
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
      z-index: 1;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 0 30px;
      height: var(--dummy-header-height);
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
      background: #fff;
      border-bottom: 1px solid transparent;
      transition: 0.2s ease-in-out border-bottom-color;
      @media (max-width: 768px) {
        padding: 0 15px;
      }
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
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
        > a {
          text-decoration: none;
        }
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
    > .footer {
      border-top: 1px solid #eee;
      padding: 30px;
      line-height: 1.5;
      @media (max-width: 768px) {
        padding: 15px;
      }
      > a {
        font-weight: 600;
      }
    }
  }
</style>
