<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import LucideSquareCode from '$base/components/icons/lucide--square-code.svelte';
  import type { PathModel } from '$base/lib/pages/path.svelte';
  import { getSession } from '$base/lib/session/session.svelte';

  let { model }: { model: PathModel } = $props();

  let session = getSession();
  let isSignedIn = $derived(session.user);
  let route = $derived(model.backendRoute);
</script>

{#if isSignedIn}
  <a class="backend" href={route}>
    <Icon icon={LucideSquareCode} />
  </a>
{/if}

<style lang="scss">
  @use 'sass:color';

  .backend {
    position: fixed;
    bottom: 5px;
    left: 5px;
    color: color.adjust(#000, $alpha: -0.2);
    opacity: 0;
    transition: 0.15s ease-in-out opacity;
    &:hover {
      opacity: 1;
    }
  }
</style>
