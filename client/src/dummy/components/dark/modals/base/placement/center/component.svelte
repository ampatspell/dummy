<script lang="ts">
  import type { PlacementComponentProps } from '../placement.svelte';

  let { children }: PlacementComponentProps = $props();
</script>

<div class="center">
  {@render children()}
</div>
