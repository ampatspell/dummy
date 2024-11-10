<script lang="ts">
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';

  let { layout }: { layout: LayoutModel } = $props();

  let definition = $derived(layout.definition!);
  let Component = $derived(definition.backend);
</script>

<Section>
  <Header title={definition.name} />
  <Component {layout} />
</Section>
