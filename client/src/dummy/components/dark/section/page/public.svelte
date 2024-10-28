<script lang="ts">
  import LucideFlame from '$dummy/components/icons/lucide--flame.svelte';
  import Icon from './icon.svelte';

  let {
    route,
  }: {
    route?: string;
  } = $props();
</script>

{#if route}
  <Icon icon={LucideFlame} {route} />
{/if}
