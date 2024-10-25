<script lang="ts">
  import Grid from '$base/components/backend/routes/galleries/gallery/grid/grid.svelte';
  import Header from '$base/components/dark/inspector/header.svelte';
  import InputRow from '$base/components/dark/inspector/input-row.svelte';
  import Inspector from '$base/components/dark/inspector/inspector.svelte';
  import Row from '$base/components/dark/inspector/row.svelte';
  import Section from '$base/components/dark/inspector/section.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';
  import {
    fromOptional as fromOptionalProperty,
    optionalNumberToStringProperty,
  } from '$base/lib/utils/property-wrappers';
  import type { HelloPageSettingsModel } from './settings.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = page.settings as HelloPageSettingsModel;

  let properties = $derived(settings.properties);
  let title = $derived(properties.title);
  let fontSize = $derived(optionalNumberToStringProperty(properties.fontSize));
  let imagePadding = $derived(optionalNumberToStringProperty(properties.imagePadding));
  let gallery = $derived(properties.gallery);

  // let galleries = new GalleriesModel({});
  // $effect(() => subscribe(galleries));
</script>

<Inspector>
  <Section>
    <Header title="Hello" />
  </Section>
  <Section>
    <InputRow label="Title" property={title} />
    <InputRow label="Font size" property={fontSize} />
    <InputRow label="Image padding" property={imagePadding} />
    <InputRow label="Gallery" property={fromOptionalProperty(gallery, '')} />
  </Section>
  {#if settings.gallery?.exists}
    <Section>
      <Row>
        <Grid gallery={settings.gallery} isEditing={false} />
      </Row>
    </Section>
  {/if}
</Inspector>
