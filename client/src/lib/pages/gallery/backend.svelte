<script lang="ts">
  import Grid from '$dummy/components/backend/routes/galleries/gallery/grid/grid.svelte';
  import GalleryRow from '$dummy/components/dark/inspector/gallery-row.svelte';
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import Row from '$dummy/components/dark/inspector/row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import { buildGalleriesModel } from '$dummy/lib/galleries/galleries.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import { fromOptional } from '$dummy/lib/utils/property-wrappers';
  import type { GalleryPageSettingsModel } from './settings.svelte';

  let { page }: { page: PageModel } = $props();

  let settings = $derived(page.settingsAs<GalleryPageSettingsModel>());

  let galleries = buildGalleriesModel();
  $effect(() => subscribe(galleries));
</script>

<Section>
  <InputRow label="Title" property={settings.properties.title} />
  <InputRow label="Introduction" property={fromOptional(settings.properties.introduction, '')} />
  <GalleryRow label="Gallery" property={settings.properties.gallery} {galleries} />
</Section>

{#if settings.gallery}
  <Section>
    <Row>
      <Grid gallery={settings.gallery} isEditing={false} />
    </Row>
  </Section>
{/if}
