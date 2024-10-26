<script lang="ts">
  import InputRow from '$base/components/dark/inspector/input-row.svelte';
  import Section from '$base/components/dark/inspector/section.svelte';
  import { fromOptionalProperty, optionalNumberToStringProperty } from '$base/lib/utils/property-wrappers';
  import type { HelloPageSettingsModel } from '../settings.svelte';

  let { settings }: { settings: HelloPageSettingsModel } = $props();

  let properties = $derived(settings.properties);
  let title = $derived(properties.title);
  let fontSize = $derived(optionalNumberToStringProperty(properties.fontSize));
  let imagePadding = $derived(optionalNumberToStringProperty(properties.imagePadding));
  let gallery = $derived(fromOptionalProperty(properties.gallery, ''));
</script>

<Section>
  <InputRow label="Title" property={title} />
  <InputRow label="Font size" property={fontSize} />
  <InputRow label="Image padding" property={imagePadding} />
  <InputRow label="Gallery" property={gallery} />
</Section>
