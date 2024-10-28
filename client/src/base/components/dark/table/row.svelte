<script lang="ts">
  import { classes } from '$base/lib/utils/classes';
  import type { Snippet } from 'svelte';

  let { type: _type, value, children }: { type?: 'regular' | 'primary'; value?: string; children?: Snippet } = $props();

  let type = $derived(_type ?? 'regular');
</script>

<div class={classes('row', `type-${type}`)}>
  {#if children}
    {@render children?.()}
  {:else}
    {value}
  {/if}
</div>

<style lang="scss">
  .row {
    display: flex;
    flex-direction: row;
    gap: 5px;
    &.type-primary {
      font-weight: 600;
    }
  }
</style>
