<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import LucideFlame from '$base/components/icons/lucide--flame.svelte';

  let {
    title,
    fontSize,
    isGrid,
    toggleGridUrl,
  }: { title: string; fontSize: number; isGrid: boolean; toggleGridUrl: string } = $props();
</script>

<div class="header" class:is-grid={isGrid}>
  <div class="content">
    <a href={toggleGridUrl}>
      <Icon icon={LucideFlame} size="large" />
    </a>
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
      gap: 20px;
      > .title {
        font-size: var(--font-size);
      }
    }
    &.is-grid {
      height: auto;
      padding: 100px 0;
    }
  }
</style>
