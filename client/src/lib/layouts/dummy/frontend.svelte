<script lang="ts">
  import './frontend.scss';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';
  import type { Snippet } from 'svelte';
  import type { PathWithArgs } from '$dummy/lib/pages/path.svelte';

  let {
    children,
  }: {
    children: Snippet;
    layout: LayoutModel;
    path: PathWithArgs | undefined;
  } = $props();
</script>

<div class="dummy">
  {@render children()}
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
  }
</style>
