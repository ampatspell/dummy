<script lang="ts">
  import Column from '$dummy/components/dark/inspector/column.svelte';
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import Row from '$dummy/components/dark/inspector/row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';

  let { page }: { page: PageModel } = $props();

  let title = 'Page';

  let properties = page.properties;
  let name = properties.name;
  let path = properties.path;
  let definition = properties.definition;
</script>

<Overflow overflow="y">
  <Inspector>
    <Section>
      <Header {title} />
    </Section>
    <Section>
      <InputRow label="Name" property={name} />
      <InputRow label="Path" property={path} />
      <InputRow label="Definition" property={definition} />
    </Section>
    <Section>
      <Row>
        <Column label="Number of views">
          {page.viewCount}
        </Column>
      </Row>
    </Section>
  </Inspector>
</Overflow>
