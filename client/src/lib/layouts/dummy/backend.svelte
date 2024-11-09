<script lang="ts">
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import ValueRow from '$dummy/components/dark/inspector/value-row.svelte';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';
  import type { DummyLayoutSettingsModel } from './settings.svelte';

  let { layout }: { layout: LayoutModel } = $props();
  let settings = $derived(layout.settings as DummyLayoutSettingsModel);
</script>

<Inspector>
  <Section>
    <Header title="'Dummy' layout" />
  </Section>
  <Section>
    <ValueRow label="Layout" value={layout.description} />
    <ValueRow label="Settings" value={settings.description} />
  </Section>
</Inspector>
