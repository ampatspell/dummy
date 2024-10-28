<script lang="ts">
  import Grid from '$dummy/components/backend/routes/galleries/gallery/grid/grid.svelte';
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import Row from '$dummy/components/dark/inspector/row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import type { HelloPageSettingsModel } from '../settings.svelte';
  import Properties from './properties.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = page.settings as HelloPageSettingsModel;
</script>

<Inspector>
  <Section>
    <Header title="'Hello' layout" />
  </Section>
  <Properties {settings} />
  {#if settings.gallery}
    <Section>
      <Row>
        <Grid gallery={settings.gallery} isEditing={false} />
      </Row>
    </Section>
  {/if}
</Inspector>
