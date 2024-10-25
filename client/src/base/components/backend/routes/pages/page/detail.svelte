<script lang="ts">
  import Header from '$base/components/dark/inspector/header.svelte';
  import InputRow from '$base/components/dark/inspector/input-row.svelte';
  import Inspector from '$base/components/dark/inspector/inspector.svelte';
  import Overflow from '$base/components/dark/overflow.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';

  let { page }: { page: PageModel } = $props();

  let title = 'Page';

  let properties = page.properties;
  let name = properties.name;
  let definition = properties.definition;
</script>

<Overflow overflow="y">
  <Inspector>
    <Header {title} />
    <InputRow label="Name" property={name} />
    <InputRow label="Definition" property={definition} />
  </Inspector>
</Overflow>
