<script lang="ts">
  import Header from '$lib/dark/inspector/header.svelte';
  import Inspector from '$lib/dark/inspector/inspector.svelte';
  import ButtonColumn from '$lib/dark/inspector/row/button-column.svelte';
  import DevRow from '$lib/dark/inspector/row/dev-row.svelte';
  import IdRow from '$lib/dark/inspector/row/id-row.svelte';
  import IdentifierRow from '$lib/dark/inspector/row/identifier-row.svelte';
  import InputRow from '$lib/dark/inspector/row/input-row.svelte';
  import Row from '$lib/dark/inspector/row/row.svelte';
  import Section from '$lib/dark/inspector/section.svelte';
  import type { PageModel } from '$lib/page/models/page.svelte';
  import type { BlockType } from '$lib/utils/types';

  let { model }: { model: PageModel } = $props();

  let replaceWith = (type: BlockType) => async () => {
    await model.replaceWith(type);
  };

  let grid = replaceWith('grid');
  let text = replaceWith('text');
</script>

<Inspector>
  <Header title="Page" />
  <Section>
    <IdRow value={model.id} />
    <IdentifierRow value={model.identifier} />
    <InputRow label="Title" property={model.properties.title} />
  </Section>
  <Section>
    <Row>
      <ButtonColumn label="Grid" onClick={grid} />
      <ButtonColumn label="Text" onClick={text} />
    </Row>
  </Section>
  <Section>
    <DevRow name="page" {model} />
  </Section>
</Inspector>
