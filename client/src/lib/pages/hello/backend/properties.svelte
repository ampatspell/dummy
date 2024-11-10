<script lang="ts">
  import GalleryRow from '$dummy/components/dark/inspector/gallery-row.svelte';
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import { buildGalleriesModel } from '$dummy/lib/galleries/galleries.svelte';
  import { optionalNumberToStringProperty } from '$dummy/lib/utils/property-wrappers';
  import type { HelloPageSettingsModel } from './settings.svelte';

  let { settings }: { settings: HelloPageSettingsModel } = $props();

  let properties = $derived(settings.properties);
  let title = $derived(properties.title);
  let imagePadding = $derived(optionalNumberToStringProperty(properties.imagePadding));
  let gallery = $derived(properties.gallery);

  let galleries = buildGalleriesModel();
  $effect(() => subscribe(galleries));
</script>

<Section>
  <InputRow label="Title" property={title} />
  <InputRow label="Image padding" property={imagePadding} />
  <GalleryRow label="Gallery" property={gallery} {galleries} />
</Section>
