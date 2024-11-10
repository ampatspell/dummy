<script lang="ts">
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';
  import type { DummyLayoutSettingsModel } from './settings.svelte';

  let { layout }: { layout: LayoutModel } = $props();
  let settings = $derived(layout.settings as DummyLayoutSettingsModel);

  let properties = $derived(settings.properties);
  let title = $derived(properties.title);
</script>

<Inspector>
  <Section>
    <Header title="'Dummy' layout" />
  </Section>
  <Section>
    <InputRow label="Title" property={title} />
  </Section>
</Inspector>
