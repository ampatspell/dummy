<script lang="ts">
  import type { Modal } from './modal.svelte';

  let { modal }: { modal: Modal } = $props();

  let Placement = $derived(modal.placement.component);
  let Component = $derived(modal.component);
  let runtime = $derived(modal.runtime);
</script>

<Placement {modal}>
  <Component modal={runtime} />
</Placement>
