<script lang="ts" module>
  import { createContext } from '$base/lib/utils/context';
  import { options, type OptionsInput } from '$base/lib/utils/options';

  export type FormContextOptions = {
    onSave: () => Promise<void>;
  };

  export class FormContext {
    private readonly options: FormContextOptions;

    isDisabled = $state(false);

    constructor(opts: OptionsInput<FormContextOptions>) {
      this.options = options(opts);
    }

    async onSave() {
      if (this.isDisabled) {
        return;
      }
      try {
        this.isDisabled = true;
        await this.options.onSave();
      } finally {
        this.isDisabled = false;
      }
    }

    isPropertyDisabled(property: Property<any>) {
      return this.isDisabled || property.isDisabled;
    }
  }

  let { get: getFormContext, set: setFormContext } = createContext<FormContext>('form');

  const createFormContext = (opts: OptionsInput<FormContextOptions>) => {
    return setFormContext(new FormContext(opts));
  };

  export { getFormContext, createFormContext };
</script>

<script lang="ts">
  import { classes } from '$base/lib/utils/classes';
  import type { Snippet } from 'svelte';
  import type { Property } from '$base/lib/utils/property.svelte';

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
