<script lang="ts">
  import LucideCirclePlus from '$base/components/icons/lucide--circle-plus.svelte';
  import type { VoidCallback } from '$base/lib/utils/types';
  import Icon from './icon.svelte';

  let {
    onClick,
    route,
  }: {
    route?: string;
    onClick?: VoidCallback;
  } = $props();
</script>

<Icon icon={LucideCirclePlus} {route} {onClick} />
