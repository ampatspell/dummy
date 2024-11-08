<script lang="ts">
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import Overflow from '$dummy/components/dark/overflow.svelte';
  import Placeholder from '$dummy/components/dark/section/placeholder.svelte';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';

  let { layout }: { layout: LayoutModel } = $props();

  let definition = $derived(layout.definition);
</script>

{#if definition}
  <Overflow overflow="y">
    <Inspector>
      <Section>
        <Header title="'Dummy' layout" />
      </Section>
    </Inspector>
  </Overflow>
{:else}
  <Placeholder label="Layout definition missing" />
{/if}
