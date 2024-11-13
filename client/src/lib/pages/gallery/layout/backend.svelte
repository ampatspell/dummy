<script lang="ts">
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import type { LayoutPageModel } from '$dummy/lib/layouts/layout.svelte';
  import { optionalNumberToString } from '$dummy/lib/utils/property-wrappers';
  import type { GalleryPageLayoutSettingsModel } from '../settings.svelte';

  let { page }: { page: LayoutPageModel } = $props();

  let settings = $derived(page.settingsAs<GalleryPageLayoutSettingsModel>());
  let lightboxHeight = $derived(optionalNumberToString(settings.properties.lightboxHeight));
</script>

<InputRow label="Lightbox height (innerHeight - x)" property={lightboxHeight} />
