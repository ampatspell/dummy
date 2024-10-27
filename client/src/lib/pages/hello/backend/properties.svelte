<script lang="ts">
  import GalleryRow from '$base/components/dark/inspector/gallery-row.svelte';
  import InputRow from '$base/components/dark/inspector/input-row.svelte';
  import Section from '$base/components/dark/inspector/section.svelte';
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { buildGalleriesModel } from '$base/lib/galleries/galleries.svelte';
  import { optionalNumberToStringProperty } from '$base/lib/utils/property-wrappers';
  import type { HelloPageSettingsModel } from '../settings.svelte';

  let { settings }: { settings: HelloPageSettingsModel } = $props();

  let properties = $derived(settings.properties);
  let title = $derived(properties.title);
  let fontSize = $derived(optionalNumberToStringProperty(properties.fontSize));
  let imagePadding = $derived(optionalNumberToStringProperty(properties.imagePadding));
  let gallery = $derived(properties.gallery);

  let galleries = buildGalleriesModel();
  $effect(() => subscribe(galleries));
</script>

<Section>
  <InputRow label="Title" property={title} />
  <InputRow label="Font size" property={fontSize} />
  <InputRow label="Image padding" property={imagePadding} />
  <GalleryRow label="Gallery" property={gallery} {galleries} />
</Section>
