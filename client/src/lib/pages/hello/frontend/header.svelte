<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import LucideFlame from '$base/components/icons/lucide--flame.svelte';

  let { title, fontSize }: { title: string; fontSize: number } = $props();
</script>

<div class="header">
  <div class="content">
    <Icon icon={LucideFlame} size="large" />
    <div class="title" style:--font-size="{fontSize}px">
      {title}
    </div>
  </div>
</div>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    > .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 50px;
      > .title {
        font-size: var(--font-size);
      }
    }
  }
</style>
