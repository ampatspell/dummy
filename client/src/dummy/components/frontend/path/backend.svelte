<script lang="ts">
  import Icon from '$dummy/components/dark/icon.svelte';
  import LucideSquareCode from '$dummy/components/icons/lucide--square-code.svelte';
  import type { PathModel } from '$dummy/lib/pages/path.svelte';

  let { model }: { model: PathModel } = $props();

  let route = $derived(model.backendRoute);
</script>

<a class="backend" href={route}>
  <Icon icon={LucideSquareCode} />
</a>

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
