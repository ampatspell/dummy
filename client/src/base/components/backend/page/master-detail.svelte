<script lang="ts">
  import type { Snippet } from 'svelte';

  let { master, detail }: { master: Snippet; detail: Snippet } = $props();
</script>

<div class="master-detail">
  <div class="master">
    {@render master()}
  </div>
  <div class="detail">
    {@render detail()}
  </div>
</div>

<style lang="scss">
  .master-detail {
    flex: 1;
    display: flex;
    flex-direction: row;
    > .master {
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    > .detail {
      height: 100%;
      width: 250px;
      display: flex;
      flex-direction: column;
      border-left: 1px solid var(--dark-border-color-1);
    }
  }
</style>
