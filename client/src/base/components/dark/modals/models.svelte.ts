import { Model } from '$base/lib/firebase/fire/model.svelte';
import { createContext } from '$base/lib/utils/context';
import { serialized } from '$base/lib/utils/object';
import { getter, options, type OptionsInput } from '$base/lib/utils/options';
import { Deferred } from '$base/lib/utils/promise';
import type { Snippet } from 'svelte';

export type ModalRuntimeOptions<I, R> = {
  modal: Modal<I, R>;
};

export class ModalRuntime<I, R> extends Model<ModalRuntimeOptions<I, R>> {
  props = $derived(this.options.modal.props);

  resolve(resolution: R) {
    this.options.modal.resolve(resolution);
  }
}

export type OpenModalOptions<I, R> = {
  props: I;
  snippet: Snippet<[ModalRuntime<I, R>]>;
  placement: 'center';
  block: boolean;
  cancel?: () => R;
};

export class ModalsContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modal = $state<Modal<any, any>>();

  async open<I, R>(opts: OptionsInput<OpenModalOptions<I, R>>) {
    const modal = new Modal({
      context: this,
      open: options(opts),
    });
    this.modal = modal;
    return await modal.promise;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  close(modal: Modal<any, any>) {
    if (this.modal === modal) {
      this.modal = undefined;
    }
  }

  serialized = $derived(serialized(this, ['modal']));
}

export type ModalOptions<I, R> = {
  context: ModalsContext;
  open: OpenModalOptions<I, R>;
};

export class Modal<I, R> extends Model<ModalOptions<I, R> & { deferred: Deferred<R>; runtime: ModalRuntime<I, R> }> {
  constructor(opts: OptionsInput<ModalOptions<I, R>>) {
    super({
      ...opts,
      deferred: new Deferred<R>(),
      runtime: new ModalRuntime<I, R>({
        modal: getter(() => this),
      }),
    });
  }

  props = $derived(this.options.open.props);
  snippet = $derived(this.options.open.snippet);
  runtime = $derived(this.options.runtime);
  placement = $derived(this.options.open.placement);
  block = $derived(this.options.open.block);

  resolve(resolution: R) {
    this.options.deferred.resolve(resolution);
    this.options.context.close(this);
  }

  onClickOutside() {
    const fn = this.options.open.cancel;
    if (fn) {
      this.resolve(fn());
    }
  }

  promise = $derived(this.options.deferred.promise);

  serialized = $derived(serialized(this, []));
}

const { get, set } = createContext<ModalsContext>('modals');

const createModalsContext = () => set(new ModalsContext());

export { createModalsContext, get as getModalsContext };
