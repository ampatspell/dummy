import { Model } from '$base/lib/firebase/fire/model.svelte';
import { createContext } from '$base/lib/utils/context';
import { serialized } from '$base/lib/utils/object';
import { options, type OptionsInput } from '$base/lib/utils/options';
import { Deferred } from '$base/lib/utils/promise';
import type { Component } from 'svelte';

export type ModalRuntime<I, O> = {
  props: I;
  resolve: (resolution: O) => void;
};

type ModalComponentRuntimeProp<C> = C extends Component<infer Props> ? Props['modal'] : never;
type ModalRuntimeInputOutput<C> =
  ModalComponentRuntimeProp<C> extends ModalRuntime<infer I, infer O>
    ? {
        props: I;
        resolution: O;
      }
    : never;

export type ModalProps<C> = ModalRuntimeInputOutput<C>['props'];
export type ModalResolve<C> = ModalRuntimeInputOutput<C>['resolution'];

type ModalRuntimeImplOptions<C, I> = {
  modal: Modal<C>;
  props: I;
};

class ModalRuntimeImpl<C, I extends ModalProps<C>, O extends ModalResolve<C>>
  extends Model<ModalRuntimeImplOptions<C, I>>
  implements ModalRuntime<I, O>
{
  readonly props = $derived(this.options.props);

  resolve(resolution: O) {
    this.options.modal.resolve(resolution);
  }
}

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
    return new ModalRuntimeImpl({
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
}

const { get, set } = createContext<ModalsContext>('modals');

const createModalsContext = () => set(new ModalsContext());

export { createModalsContext, get as getModalsContext };
