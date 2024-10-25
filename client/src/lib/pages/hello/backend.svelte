<script lang="ts">
  import Header from '$base/components/dark/inspector/header.svelte';
  import InputRow from '$base/components/dark/inspector/input-row.svelte';
  import Inspector from '$base/components/dark/inspector/inspector.svelte';
  import Section from '$base/components/dark/inspector/section.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';
  import type { HelloPageSettingsModel } from './settings.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = page.settings as HelloPageSettingsModel;
</script>

<Inspector>
  <Section>
    <Header title="Hello" />
    <InputRow label="Title" property={settings.properties.title} />
  </Section>
</Inspector>
