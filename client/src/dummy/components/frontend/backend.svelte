<script lang="ts">
  import { getSession } from '$dummy/lib/session/session.svelte';
  import Icon from '../dark/icon.svelte';
  import LucideSquareCode from '../icons/lucide--square-code.svelte';

  let { route }: { route: string } = $props();

  let session = getSession();
  let isAdmin = $derived(session.user?.isAdmin === true);
</script>

{#if isAdmin}
  <a href={route} target="_blank" class="backend">
    <Icon size="small" icon={LucideSquareCode} />
  </a>
{/if}

<style lang="scss">
  .backend {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 5px;
    opacity: 0;
    transition: 0.15s ease-in-out opacity;
    &:hover {
      opacity: 1;
    }
  }
</style>
