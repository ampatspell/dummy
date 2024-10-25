import { beforeNavigate } from '$app/navigation';
import { Model } from '$base/lib/firebase/fire/model.svelte';
import { options, type OptionsInput } from '$base/lib/utils/options';
import type { BeforeNavigate } from '@sveltejs/kit';
import { Modal, type OpenModalOptions } from './modal.svelte';
import { serialized } from '$base/lib/utils/object';
import { createContext } from '$base/lib/utils/context';

export type ModalsContextOptions = Record<string, never>;

export class ModalsContext extends Model<ModalsContextOptions> {
  constructor(opts: OptionsInput<ModalsContextOptions>) {
    super(opts);
    beforeNavigate((navigation: BeforeNavigate) => this.onBeforeNavigate(navigation));
  }

  modal = $state<Modal<unknown>>();

  async open<C>(opts: OptionsInput<OpenModalOptions<C>>) {
    const modal = new Modal<C>({
      context: this,
      open: options(opts),
    });
    this.modal = modal;
    return await modal.promise;
  }

  close(modal: Modal<unknown>) {
    if (this.modal === modal) {
      this.modal = undefined;
    }
  }

  onBeforeNavigate(navigation: BeforeNavigate) {
    this.modal?.onBeforeNavigate(navigation);
  }

  readonly serialized = $derived(serialized(this, ['modal']));
}

const { get, set } = createContext<ModalsContext>('modals');

const createModalsContext = () => set(new ModalsContext({}));

export { createModalsContext, get as getModalsContext };
