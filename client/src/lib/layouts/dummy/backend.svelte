<script lang="ts">
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';
  import type { DummyLayoutSettingsModel } from './settings.svelte';

  let { layout }: { layout: LayoutModel } = $props();
  let settings = $derived(layout.settings as DummyLayoutSettingsModel);

  let properties = $derived(settings.properties);
  let title = $derived(properties.title);
</script>

<InputRow label="Title" property={title} />
