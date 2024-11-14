<script lang="ts">
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import type { LayoutPageModel } from '$dummy/lib/layouts/layout.svelte';
  import { optionalIntegerToString } from '$dummy/lib/utils/property.svelte';
  import type { GalleryPageLayoutSettingsModel } from '../settings.svelte';

  let { page }: { page: LayoutPageModel } = $props();

  let settings = $derived(page.settingsAs<GalleryPageLayoutSettingsModel>());
  let lightboxHeight = $derived(optionalIntegerToString(settings.properties.lightboxHeight));
</script>

<InputRow label="Lightbox height (innerHeight - x)" property={lightboxHeight} />
