<script lang="ts">
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import type { LayoutPageModel } from '$dummy/lib/layouts/layout.svelte';

  let { page }: { page: LayoutPageModel } = $props();
  let Component = $derived(page.definition.layout.backend);

  $effect(() => {
    page.maybePrepare();
  });
</script>

<Section>
  <Header title={page.definition.name} />
  <Component {page} />
</Section>
