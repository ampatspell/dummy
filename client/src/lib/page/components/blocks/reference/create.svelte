<script lang="ts">
  import Button from '$lib/dark/button.svelte';

  let grid = () => {};
</script>

<div class="card">
  <Button label="Grid" onClick={() => grid()} />
  <Button label="Text" onClick={() => {}} />
  <Button label="Placeholder" onClick={() => {}} />
</div>

<style lang="scss">
  .card {
    padding: 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
</style>
