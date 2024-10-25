<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import LucideFlame from '$base/components/icons/lucide--flame.svelte';
  import type { PageModel } from '$base/lib/pages/page.svelte';
  import type { HelloPageSettingsModel } from './settings.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = page.settings as HelloPageSettingsModel;
  let fontSize = $derived(settings.fontSize ?? 18);
</script>

<div class="hello">
  <div class="content">
    <Icon icon={LucideFlame} size="large" />
    <div class="title" style:--font-size="{fontSize}px">
      {settings.title}
    </div>
  </div>
</div>

<style lang="scss">
  .hello {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      > .title {
        font-size: var(--font-size);
      }
    }
  }
</style>
