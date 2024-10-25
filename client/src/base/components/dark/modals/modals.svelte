<script lang="ts">
  import Container from './container.svelte';
  import { getModalsContext } from './models.svelte';

  let context = getModalsContext();
  let modal = $derived(context.modal);
</script>

{#if modal}
  <Container {modal} />
{/if}
