import { createContext } from '$base/lib/utils/context';
import { options, type OptionsInput } from '$base/lib/utils/options';
import type { Property } from '$base/lib/utils/property.svelte';

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isPropertyDisabled(property: Property<any>) {
    return this.isDisabled || property.isDisabled;
  }
}

const { get: getFormContext, set: setFormContext } = createContext<FormContext>('form');

const createFormContext = (opts: OptionsInput<FormContextOptions>) => {
  return setFormContext(new FormContext(opts));
};

export { getFormContext, createFormContext };
