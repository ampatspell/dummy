<script lang="ts">
  import Placeholder from '../placeholder.svelte';
  import { getSectionContext } from './models.svelte';

  let context = getSectionContext();
  let icon = $derived(context.icon);

  let { label }: { label?: string } = $props();
</script>

<Placeholder {icon} {label} />
