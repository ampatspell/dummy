<script lang="ts">
  import './frontend.scss';
  import type { Snippet } from 'svelte';
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';

  let {
    runtime,
    children,
  }: {
    runtime: PageRuntimeModel;
    children: Snippet;
  } = $props();

  let opacity = $state(1);

  let update = () => {
    let max = window.innerHeight / 2;
    let y = Math.min(window.scrollY, max);
    opacity = 1 - y / max;
  };

  let onscroll = () => {
    update();
  };
</script>

<svelte:window {onscroll} />

<div class="dummy">
  <div class="header" style:--opacity={opacity} class:hidden={opacity === 0}>
    <a href="/">Home</a>
    <a href="/693-696">693-696</a>
    {runtime}
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
    > .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 30px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 15px;
      opacity: var(--opacity);
      > a {
        text-decoration: none;
      }
      &.hidden {
        pointer-events: none;
      }
    }
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
