<script lang="ts">
  import { getActiveInputElement } from '$base/lib/utils/dom';
  import { getModalsContext } from '../models/context.svelte';
  import Container from './container.svelte';

  let context = getModalsContext();
  let modals = $derived(context.modals);
  let last = $derived(context.last);

  let onkeyup = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && !e.shiftKey && !getActiveInputElement()) {
      last?.dismiss();
    }
  };
</script>

<svelte:window {onkeyup} />

{#each modals as modal}
  <Container {modal} />
{/each}
