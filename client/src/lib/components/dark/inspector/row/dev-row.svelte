<script lang="ts">
  import { setGlobal } from '$lib/utils/set-global';
  import Icon from '../../icon.svelte';
  import LucideFileTerminal from '../../icons/lucide--file-terminal.svelte';
  import Column from './column/column.svelte';
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
