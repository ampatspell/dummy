<script lang="ts">
  import { getModalsContext } from '../models/context.svelte';
  import Container from './container.svelte';

  let context = getModalsContext();
  let modals = $derived(context.modals);
</script>

{#each modals as modal}
  <Container {modal} />
{/each}
