<script lang="ts">
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import PageDefinitionRow from '$dummy/components/dark/inspector/page-definition-row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import ValueRow from '$dummy/components/dark/inspector/value-row.svelte';
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import { toOptional } from '$dummy/lib/utils/property.svelte';

  let { page }: { page: PageModel } = $props();

  let title = 'Page';

  let properties = $derived(page.properties);
  let name = $derived(properties.name);
  let path = $derived(properties.path);
  let definition = $derived(toOptional(properties.definition, ''));
</script>

<Overflow overflow="y">
  <Inspector>
    <Section>
      <Header {title} />
    </Section>
    <Section>
      <InputRow label="Name" property={name} />
      <InputRow label="Path" property={path} />
      <PageDefinitionRow label="Definition" property={definition} />
    </Section>
    <Section>
      <ValueRow label="Number of views" value={page.views} />
    </Section>
  </Inspector>
</Overflow>
