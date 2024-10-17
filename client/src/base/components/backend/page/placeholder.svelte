<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import { getPageContext } from './page.svelte';

  let context = getPageContext();
  let icon = $derived(context.icon);

  let { label }: { label?: string } = $props();
</script>

<div class="placeholder">
  <div class="icon">
    <Icon {icon} size="large" />
  </div>
  {#if label}
    <div class="label">{label}</div>
  {/if}
</div>

<style lang="scss">
  .placeholder {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    > .icon {
      opacity: 0.1;
    }
  }
</style>
