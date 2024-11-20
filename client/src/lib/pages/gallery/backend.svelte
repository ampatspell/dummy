<script lang="ts">
  import AspectRatioRow from '$dummy/components/dark/inspector/aspect-ratio-row.svelte';
  import BooleanRow from '$dummy/components/dark/inspector/boolean-row.svelte';
  import DropdownRow from '$dummy/components/dark/inspector/dropdown-row.svelte';
  import FolderRow from '$dummy/components/dark/inspector/folder-row.svelte';
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import Row from '$dummy/components/dark/inspector/row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import { gridAlignmentLabels, gridAlignments } from '$dummy/components/frontend/blocks/galleries/grid/grid.svelte';
  import { FoldersModel } from '$dummy/lib/assets/folders.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import { toOptional, toRequired } from '$dummy/lib/utils/property.svelte';
  import { type GalleryPageSettingsModel } from './settings.svelte';
  import FolderGrid from '$dummy/components/backend/assets/grid/folder-grid.svelte';

  let { page }: { page: PageModel } = $props();

  let settings = $derived(page.settingsAs<GalleryPageSettingsModel>());

  let galleries = FoldersModel.build();
  $effect(() => subscribe(galleries));
</script>

<Section>
  <InputRow label="Title" property={settings.properties.title} />
  <InputRow label="Introduction" property={toRequired(settings.properties.introduction, '')} />
  <FolderRow label="Folder" property={settings.properties.folder} folders={galleries} />
  <AspectRatioRow label="Aspect ratio" property={settings.properties.aspectRatio} />
  <DropdownRow
    label="Grid alignment"
    property={toOptional(settings.properties.gridAlignment, 'center')}
    items={gridAlignments}
    labels={gridAlignmentLabels}
  />
  <BooleanRow label="Grid image captions" property={settings.properties.gridCaptions} />
  <BooleanRow label="Lightbox image captions" property={settings.properties.lightboxCaptions} />
</Section>

{#if settings.folder}
  <Section>
    <Row>
      <FolderGrid folder={settings.folder} />
    </Row>
  </Section>
{/if}
