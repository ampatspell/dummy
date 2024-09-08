<script lang="ts">
  import Button from '$lib/dark/button.svelte';
  import Icon from '$lib/dark/icon.svelte';
  import Card from '$lib/dark/popup/card.svelte';
  import Popup from '$lib/dark/popup/popup.svelte';
  import LucideCirclePlus from '$lib/icons/lucide-circle-plus.svelte';
</script>

<Popup>
  {#snippet children({ open })}
    <Icon icon={LucideCirclePlus} onClick={open} />
  {/snippet}
  {#snippet content()}
    <Card>
      <div class="card">
        <Button label="Grid" onClick={() => {}} />
        <Button label="Text" onClick={() => {}} />
        <Button label="Placeholder" onClick={() => {}} />
      </div>
    </Card>
  {/snippet}
</Popup>

<style lang="scss">
  .card {
    padding: 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
</style>
