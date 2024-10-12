<script lang="ts">
  import Row from '$lib/components/dark/inspector/row/row.svelte';
  import Section from '$lib/components/dark/inspector/section.svelte';
  import type { PageModel } from '../models/page.svelte';

  let { model }: { model: PageModel } = $props();
</script>

<Section title="Page">
  <Row>
    {model}
  </Row>
</Section>
