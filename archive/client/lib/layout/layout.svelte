<script lang="ts">
  import type { Snippet } from 'svelte';
  import Header from './header/header.svelte';

  let {
    children,
  }: {
    children: Snippet;
  } = $props();

  let name = 'Maija Sjomkāne';
  let description = 'Photographer';
</script>

<div class="layout">
  <div class="header">
    <Header {name} {description} />
  </div>
  <div class="content">{@render children()}</div>
</div>

<style lang="scss">
  .layout {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-self: center;
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
