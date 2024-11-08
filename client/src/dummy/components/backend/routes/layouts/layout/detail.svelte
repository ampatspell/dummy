<script lang="ts">
  import ButtonRow from '$dummy/components/dark/inspector/button-row.svelte';
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import LayoutDefinitionRow from '$dummy/components/dark/inspector/layout-definition-row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';
  import type { SiteModel } from '$dummy/lib/site/site.svelte';
  import { toOptional } from '$dummy/lib/utils/property-wrappers';

  let { layout, site }: { layout: LayoutModel; site: SiteModel } = $props();

  let title = 'Layout';

  let properties = $derived(layout.properties);
  let name = $derived(properties.name);
  let definition = $derived(toOptional(properties.definition, ''));

  let isSelected = $derived(site.layout?.id === layout.id);
  let onSelect = () => site.properties.layout.update(layout.id);
</script>

<Overflow overflow="y">
  <Inspector>
    <Section>
      <Header {title} />
    </Section>
    <Section>
      <InputRow label="Name" property={name} />
      <LayoutDefinitionRow label="Definition" property={definition} />
    </Section>
    {#if !isSelected}
      <Section>
        <ButtonRow label="Make current" onClick={onSelect} />
      </Section>
    {/if}
  </Inspector>
</Overflow>
