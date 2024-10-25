<script lang="ts">
  import LucideCirclePlus from '$base/components/icons/lucide--circle-plus.svelte';
  import type { VoidCallback } from '$base/lib/utils/types';
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
