<script lang="ts">
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import type { LayoutPageModel } from '$dummy/lib/layouts/layout.svelte';
  import { optionalNumberToStringProperty } from '$dummy/lib/utils/property-wrappers';
  import type { HelloPageLayoutSettingsModel } from './settings.svelte';

  let { page }: { page: LayoutPageModel } = $props();

  let settings = $derived(page.settings as HelloPageLayoutSettingsModel);
  let fontSize = $derived(optionalNumberToStringProperty(settings.properties.fontSize));
</script>

<InputRow label="Font size" property={fontSize} />
