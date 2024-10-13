<script lang="ts">
  import type { Snippet } from 'svelte';
  import './theme.scss';
  import { getLayout } from '../layout/models/layout.svelte';
  import Icon from '../dark/icon.svelte';
  import LucideNotebookPen from '../dark/icons/lucide--notebook-pen.svelte';

  let { children }: { children: Snippet } = $props();
  let layout = getLayout();
  let onEdit = () => (layout.isEditing = true);
</script>

<div class="theme amateurinmotion">
  {@render children()}
</div>

{#if !layout.isEditing}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="edit" onclick={onEdit}>
    <Icon icon={LucideNotebookPen} />
  </div>
{/if}

<style lang="scss">
  .theme {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: var(--theme-font-family);
    font-size: var(--theme-font-size);
    font-weight: var(--theme-font-weight);
    cursor: default;
  }

  .edit {
    opacity: 0;
    position: fixed;
    top: 5px;
    right: 5px;
    transition: 0.3s ease-in-out opacity;
    &:hover {
      opacity: 1;
    }
  }
</style>
