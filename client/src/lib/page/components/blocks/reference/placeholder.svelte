<script lang="ts">
  import Dark from '$lib/dark/dark.svelte';
  import Create from './create.svelte';

  let { label, isEditable }: { label: string; isEditable: boolean } = $props();
</script>

<Dark>
  <!-- svelte-ignore attribute_global_event_reference -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="placeholder" {onclick}>
    {#if isEditable}
      <div class="editable">
        <Create />
      </div>
    {:else}
      <div class="label">{label}</div>
    {/if}
  </div>
</Dark>

<style lang="scss">
  .placeholder {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    gap: 10px;
  }
</style>
