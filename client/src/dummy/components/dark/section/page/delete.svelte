<script lang="ts">
  import LucideTrash_2 from '$dummy/components/icons/lucide--trash-2.svelte';
  import { getter } from '$dummy/lib/utils/options';
  import type { PromiseVoidCallback } from '$dummy/lib/utils/types';
  import { getModalsContext } from '../../modals/base/context.svelte';
  import { relativeToBottomRight } from '../../modals/base/placement/relative-to/relative-to.svelte';
  import { withDeleteConfirmationModal } from '../../modals/confirmation/models';
  import Icon from './icon.svelte';

  let {
    name,
    onDelete,
  }: {
    name: string;
    onDelete: PromiseVoidCallback;
  } = $props();

  let element = $state<HTMLElement>();
  let modals = getModalsContext();

  let onClick = async () => {
    await withDeleteConfirmationModal(modals, {
      name,
      placement: relativeToBottomRight({
        relativeTo: getter(() => element),
        offset: { x: 0, y: 2 },
      }),
      onConfirmed: async () => {
        await onDelete();
      },
    });
  };
</script>

<Icon bind:element icon={LucideTrash_2} {onClick} />
