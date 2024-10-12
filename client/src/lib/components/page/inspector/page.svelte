<script lang="ts">
  import Column from '$lib/components/dark/inspector/row/column/column.svelte';
  import InputRow from '$lib/components/dark/inspector/row/input-row.svelte';
  import Row from '$lib/components/dark/inspector/row/row.svelte';
  import Section from '$lib/components/dark/inspector/section.svelte';
  import type { PageModel } from '../models/page.svelte';

  let { model }: { model: PageModel } = $props();
</script>

<Section title="Page">
  <Row>
    <Column label="Identifier" value={model.properties.identifier.value} />
  </Row>
  <InputRow label="Title" property={model.properties.title} />
</Section>
