<script lang="ts">
  import type { Snippet } from 'svelte';
  import Overflow from './overflow.svelte';

  let { master, detail }: { master: Snippet; detail: Snippet } = $props();
</script>

<div class="master-detail">
  <div class="master">
    <Overflow overflow="y">
      {@render master()}
    </Overflow>
  </div>
  <div class="detail">
    <Overflow overflow="y">
      {@render detail()}
    </Overflow>
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
