<script lang="ts">
  import Header from '$base/components/dark/inspector/header.svelte';
  import InputRow from '$base/components/dark/inspector/input-row.svelte';
  import Inspector from '$base/components/dark/inspector/inspector.svelte';
  import Section from '$base/components/dark/inspector/section.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';
  import { optionalNumberToStringProperty } from '$base/lib/utils/property-wrappers';
  import type { HelloPageSettingsModel } from './settings.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = page.settings as HelloPageSettingsModel;

  let properties = $derived(settings.properties);
  let title = $derived(properties.title);
  let fontSize = $derived(optionalNumberToStringProperty(properties.fontSize));
</script>

<Inspector>
  <Section>
    <Header title="Hello" />
    <InputRow label="Title" property={title} />
    <InputRow label="Font size" property={fontSize} />
  </Section>
</Inspector>
