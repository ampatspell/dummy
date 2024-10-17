<script lang="ts" generics="T">
  import type { Property } from '$base/lib/utils/property.svelte';
  import type { Snippet } from 'svelte';

  let {
    property,
    children,
  }: {
    property: Property<T>;
    children?: Snippet;
  } = $props();
</script>

<div class="field">
  <div class="label">{property.label}</div>
  {#if children}
    <div class="content">
      {@render children?.()}
    </div>
  {/if}
</div>

<style lang="scss">
  .field {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
</style>
