<script lang="ts">
  import { getModalsContext } from '../models/context.svelte';
  import Container from './container.svelte';

  let context = getModalsContext();
  let modal = $derived(context.modal);
</script>

{#if modal}
  <Container {modal} />
{/if}
