<script lang="ts">
  import Button from "$base/components/dark/button.svelte";

  let id = 0;

  class Source {
    id: number;
    exists = $state<boolean>(false);

    constructor() {
      this.id = ++id;
    }
  }

  class Target {
    id: number;
    source: Source;

    constructor(source: Source) {
      this.id = ++id;
      this.source = source;
    }

    exists = $derived.by(() => this.source.exists);
  }

  //

  let sources = $state<Source[]>([]);

  //

  let cache = new WeakMap<Source, Target>();
  let targets = $derived.by(() => {
    return sources.map(source => {
      let target = cache.get(source);
      if(!target) {
        target = new Target(source);
        cache.set(source, target);
      }
      return target;
    });
  });

  //

  let onAddSource = () => {
    sources.push(new Source());
  }

  let onMarkAllExists = () => {
    sources.forEach(source => source.exists = true);
  }
</script>

<div class="page">
  <div class="row">
    <Button label="Add source" onClick={onAddSource} />
    <Button label="Mark all as existing" onClick={onMarkAllExists} />
  </div>
  {#each targets as target}
    <div class="row">
      <!-- source: {target.source.id} exists={target.source.exists}, -->
      target: {target.id} exists={target.exists}
  </div>
  {/each}
</div>

<style lang="scss">
  .page {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    > .row {
      display: flex;
      flex-direction: row;
      gap: 5px;
    }
  }
</style>
