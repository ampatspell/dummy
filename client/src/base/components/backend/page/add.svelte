<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import LucideCirclePlus from '$base/components/icons/lucide--circle-plus.svelte';
  import type { VoidCallback } from '$base/lib/utils/types';

  let {
    onClick,
    route,
  }: {
    route?: string;
    onClick?: VoidCallback;
  } = $props();
</script>

{#snippet content()}
  <Icon icon={LucideCirclePlus} {onClick} />
{/snippet}

{#if route}
  <a href={route}>
    {@render content()}
  </a>
{:else}
  {@render content()}
{/if}
