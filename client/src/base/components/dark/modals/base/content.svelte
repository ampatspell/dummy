<script lang="ts">
  import type { Modal } from '../models/modal.svelte';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let { modal }: { modal: Modal<any> } = $props();

  let Placement = $derived(modal.placement.component);
  let Component = $derived(modal.component);
  let runtime = $derived(modal.runtime);
</script>

<Placement {modal}>
  <Component modal={runtime} />
</Placement>
