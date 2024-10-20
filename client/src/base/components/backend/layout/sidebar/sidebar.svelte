<script lang="ts">
  import Item from './item.svelte';
  import LucideUser from '$base/components/icons/lucide--user.svelte';
  import LucideImages from '$base/components/icons/lucide--images.svelte';
  import LucideActivity from '$base/components/icons/lucide--activity.svelte';
  import LucideFlame from '$base/components/icons/lucide--flame.svelte';
</script>

<div class="sidebar">
  <div class="content">
    <div class="section">
      <Item icon={LucideFlame} route="/" />
      <Item icon={LucideActivity} route="/backend" />
      <Item icon={LucideImages} route="/backend/galleries" />
    </div>
    <div class="section">
      <Item icon={LucideUser} route="/backend/profile" />
    </div>
  </div>
</div>

<style lang="scss">
  .sidebar {
    --size: 32px;
    width: var(--size);
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    > .content {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: var(--size);
      display: flex;
      flex-direction: column;
      > .section {
        display: flex;
        flex-direction: column;
        &:first-child {
          flex: 1;
        }
      }
    }
  }
</style>
