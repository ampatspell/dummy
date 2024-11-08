<script lang="ts">
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import ValueRow from '$dummy/components/dark/inspector/value-row.svelte';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';

  let { layout }: { layout: LayoutModel } = $props();
</script>

<Inspector>
  <Section>
    <Header title="'Dummy' layout" />
  </Section>
  <Section>
    <ValueRow label="Model" value={layout.description} />
  </Section>
</Inspector>
