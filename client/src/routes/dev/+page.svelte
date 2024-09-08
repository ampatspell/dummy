<script lang="ts">
  import Button from '$lib/dark/button.svelte';
  import Dark from '$lib/dark/dark.svelte';
  import Icon from '$lib/dark/icon.svelte';
  import Card from '$lib/dark/popup/card.svelte';
  import Popup from '$lib/dark/popup/popup.svelte';
  import LucideCirclePlus from '$lib/icons/lucide-circle-plus.svelte';
</script>

<Dark>
  <div class="dev">
    <div class="row">
      <Popup>
        {#snippet children({ open })}
          <Icon icon={LucideCirclePlus} onClick={open} />
        {/snippet}
        {#snippet content({ close })}
          <Card>
            <Button onClick={close} label="Close" />
          </Card>
        {/snippet}
      </Popup>
    </div>
  </div>
</Dark>

<style lang="scss">
  .dev {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > .row {
      display: flex;
      flex-direction: row;
    }
  }
</style>
