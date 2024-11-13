<script lang="ts">
  import Grid from '$dummy/components/backend/routes/galleries/gallery/grid/grid.svelte';
  import AspectRatioRow from '$dummy/components/dark/inspector/aspect-ratio-row.svelte';
  import BooleanRow from '$dummy/components/dark/inspector/boolean-row.svelte';
  import DropdownRow from '$dummy/components/dark/inspector/dropdown-row.svelte';
  import GalleryRow from '$dummy/components/dark/inspector/gallery-row.svelte';
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import Row from '$dummy/components/dark/inspector/row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import { gridAlignmentLabels, gridAlignments } from '$dummy/components/frontend/blocks/galleries/grid/grid.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import { buildGalleriesModel } from '$dummy/lib/galleries/galleries.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import { fromOptional } from '$dummy/lib/utils/property-wrappers';
  import { type GalleryPageSettingsModel } from './settings.svelte';

  let { page }: { page: PageModel } = $props();

  let settings = $derived(page.settingsAs<GalleryPageSettingsModel>());

  let galleries = buildGalleriesModel();
  $effect(() => subscribe(galleries));
</script>

<Section>
  <InputRow label="Title" property={settings.properties.title} />
  <InputRow label="Introduction" property={fromOptional(settings.properties.introduction, '')} />
  <GalleryRow label="Gallery" property={settings.properties.gallery} {galleries} />
  <AspectRatioRow label="Aspect ratio" property={settings.properties.aspectRatio} />
  <DropdownRow
    label="Grid alignment"
    property={settings.properties.gridAlignment}
    items={gridAlignments}
    labels={gridAlignmentLabels}
  />
  <BooleanRow label="Grid image captions" property={settings.properties.gridCaptions} />
  <BooleanRow label="Lightbox image captions" property={settings.properties.lightboxCaptions} />
</Section>

{#if settings.gallery}
  <Section>
    <Row>
      <Grid gallery={settings.gallery} isEditing={false} />
    </Row>
  </Section>
{/if}
