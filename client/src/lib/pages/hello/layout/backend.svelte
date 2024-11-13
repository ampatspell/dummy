<script lang="ts">
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import type { LayoutPageModel } from '$dummy/lib/layouts/layout.svelte';
  import { optionalNumberToString } from '$dummy/lib/utils/property-wrappers';
  import type { HelloPageLayoutSettingsModel } from './settings.svelte';

  let { page }: { page: LayoutPageModel } = $props();

  let settings = $derived(page.settingsAs<HelloPageLayoutSettingsModel>());
  let fontSize = $derived(optionalNumberToString(settings.properties.fontSize));
</script>

<InputRow label="Font size" property={fontSize} />
