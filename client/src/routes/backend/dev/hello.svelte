<script lang="ts">
  let {
    title,
    resolve,
  }: {
    title: string;
    resolve: (arg: 'save' | 'cancel') => void;
  } = $props();
</script>

<div class="hello">
</div>

<style lang="scss">
  .hello {
  }
</style>
