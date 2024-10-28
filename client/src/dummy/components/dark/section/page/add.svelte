<script lang="ts">
  import LucideCirclePlus from '$dummy/components/icons/lucide--circle-plus.svelte';
  import type { VoidCallback } from '$dummy/lib/utils/types';
  import Icon from './icon.svelte';

  let {
    onAdd,
    route,
  }: {
    route?: string;
    onAdd?: VoidCallback;
  } = $props();

  let onClick = () => {
    onAdd?.();
  };
</script>

<Icon icon={LucideCirclePlus} {route} {onClick} />
