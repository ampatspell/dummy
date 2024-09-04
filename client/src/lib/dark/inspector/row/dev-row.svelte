<script lang="ts">
  import Icon from '$lib/dark/icon.svelte';
  import LucideFileTerminal from '$lib/icons/lucide-file-terminal.svelte';
  import { setGlobal } from '$lib/utils/set-global';
  import Column from './column.svelte';
  import Row from './row.svelte';

  let { name, model }: { name: string; model?: unknown } = $props();

  let onClick = () => {
    setGlobal({ [name]: model });
  };
</script>

<Row>
  <Column>
    <Icon icon={LucideFileTerminal} {onClick} />
  </Column>
</Row>
