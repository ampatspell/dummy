<script lang="ts">
  import LucideTrash_2 from '$base/components/icons/lucide--trash-2.svelte';
  import type { PromiseVoidCallback } from '$base/lib/utils/types';
  import Icon from './icon.svelte';

  let {
    onDelete,
  }: {
    onDelete: PromiseVoidCallback;
  } = $props();

  let onClick = async () => {
    await onDelete();
  };
</script>

<Icon icon={LucideTrash_2} {onClick} />
