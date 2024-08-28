<script lang="ts">
  import Header from '$lib/dark/inspector/header.svelte';
  import Inspector from '$lib/dark/inspector/inspector.svelte';
  import IdRow from '$lib/dark/inspector/row/id-row.svelte';
  import IdentifierRow from '$lib/dark/inspector/row/identifier-row.svelte';
  import InputRow from '$lib/dark/inspector/row/input-row.svelte';
  import Section from '$lib/dark/inspector/section.svelte';
  import type { PageModel } from '../models/page.svelte';

  let { model }: { model: PageModel } = $props();
</script>

<Inspector>
  <Header title="Page" />
  <Section>
    <IdRow value={model.id} />
    <IdentifierRow value={model.identifier} />
    <InputRow label="Title" property={model.properties.title} />
  </Section>
</Inspector>
