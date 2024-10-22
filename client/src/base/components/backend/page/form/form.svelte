<script lang="ts">
  import { classes } from '$base/lib/utils/classes';
  import type { Snippet } from 'svelte';
  import { createFormContext } from './context.svelte';

  type FormType = 'center' | 'full';

  let {
    type: _type,
    onSave,
    children,
  }: {
    type?: FormType;
    onSave: () => Promise<void>;
    children?: Snippet;
  } = $props();

  createFormContext({
    onSave: () => onSave(),
  });

  let type: FormType = $derived(_type ?? 'full');
</script>

<div class={classes('form', `type-${type}`)}>
  <div class="content">
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .form {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    > .content {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    &.type-full {
      > .content {
        flex: 1;
      }
    }
    &.type-center {
      align-items: center;
      justify-content: center;
      > .content {
        width: 320px;
      }
    }
  }
</style>
