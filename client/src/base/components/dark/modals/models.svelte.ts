import { Model } from '$base/lib/firebase/fire/model.svelte';
import { createContext } from '$base/lib/utils/context';
import { serialized } from '$base/lib/utils/object';
import { options, type OptionsInput } from '$base/lib/utils/options';
import { Deferred } from '$base/lib/utils/promise';
import type { Component } from 'svelte';

export type ModalRuntimeOptions<I> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modal: Modal<any>;
  props: I;
};

export class ModalRuntime<I, O> extends Model<ModalRuntimeOptions<I>> {
  readonly props = $derived(this.options.props);
  resolve(resolution: O) {
    this.options.modal.resolve(resolution);
  }
}

type ModalAllProps<C> = C extends Component<infer Props> ? Props : never;
type ModalRuntimeInputOutput<C> =
  ModalAllProps<C>['modal'] extends ModalRuntime<infer I, infer O> ? { props: I; resolution: O } : never;

export type ModalProps<C> = ModalRuntimeInputOutput<C>['props'];
export type ModalResolve<C> = ModalRuntimeInputOutput<C>['resolution'];

export type OpenModalOptions<C> = {
  component: C;
  props: OptionsInput<ModalProps<C>>;
  cancel?: ModalResolve<C>;
  block?: boolean;
  placement?: 'center';
};

export class ModalsContext {
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

  serialized = $derived(serialized(this, ['modal']));
}

export type ModalOptions<C> = {
  context: ModalsContext;
  open: OpenModalOptions<C>;
};

export class Modal<C> extends Model<ModalOptions<C>> {
  private deferred = $derived.by(() => {
    return new Deferred<ModalResolve<C>>();
  });

  props = $derived(options(this.options.open.props));
  component = $derived(this.options.open.component);
  placement = $derived(this.options.open.placement ?? 'center');
  block = $derived(this.options.open.block ?? true);

  runtime = $derived.by(() => {
    return new ModalRuntime({
      modal: this,
      props: this.props,
    });
  });

  resolve(resolution: ModalResolve<C>) {
    this.deferred.resolve(resolution);
    this.options.context.close(this);
  }

  onClickOutside() {
    this.resolve(this.options.open.cancel);
  }

  promise = $derived(this.deferred.promise);

  serialized = $derived(serialized(this, []));
}

const { get, set } = createContext<ModalsContext>('modals');

const createModalsContext = () => set(new ModalsContext());

export { createModalsContext, get as getModalsContext };
