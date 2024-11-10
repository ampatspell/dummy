import { Model } from '$dummy/lib/firebase/fire/model.svelte';
import { type OptionsInput, options } from '$dummy/lib/utils/options';
import type { Component } from 'svelte';
import type { ModalsContext } from './context.svelte';
import { Deferred } from '$dummy/lib/utils/promise';
import type { BeforeNavigate } from '@sveltejs/kit';
import type { Placement } from '../base/placement/placement.svelte';
import { center } from '../base/placement/center/placement.svelte';

export type ModalRuntime<I, O> = {
  readonly props: I;
  resolve: (resolution: O) => void;
  isDismissible: boolean;
  dismiss: () => boolean;
  withBusy<T>(cb: () => Promise<T>): Promise<T>;
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
  readonly isDismissible = $derived(this.options.modal.dismissible);

  resolve(resolution: O) {
    this.options.modal.resolve(resolution);
  }

  dismiss() {
    return this.options.modal.dismiss();
  }

  withBusy<T>(cb: () => Promise<T>): Promise<T> {
    return this.options.modal.withBusy(cb);
  }
}

export type OpenModalOptions<C> = {
  component: C;
  props: OptionsInput<ModalProps<C>>;
  cancel?: NoInfer<ModalResolve<C>>;
  dismissible?: boolean;
  placement?: Placement;
};

export type ModalOptions<C> = {
  context: ModalsContext;
  open: OpenModalOptions<C>;
};

const defaultPlacement = center();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Modal<C = any> extends Model<ModalOptions<C>> {
  private readonly deferred = $derived.by(() => {
    return new Deferred<ModalResolve<C>>();
  });

  private busy = $state(0);
  readonly isBusy = $derived(this.busy > 0);

  readonly props = $derived(options(this.options.open.props));
  readonly component = $derived(this.options.open.component);
  readonly placement = $derived(this.options.open.placement ?? defaultPlacement);
  readonly _dismissible = $derived(this.options.open.dismissible ?? true);
  readonly dismissible = $derived(!this.isBusy && this._dismissible);

  readonly runtime = $derived.by(() => {
    return new ModalRuntimeImpl({
      modal: this,
      props: this.props,
    });
  });

  async withBusy<T>(cb: () => Promise<T>): Promise<T> {
    this.busy++;
    try {
      return await cb();
    } finally {
      this.busy--;
    }
  }

  resolve(resolution: ModalResolve<C>) {
    this.deferred.resolve(resolution);
    this.options.context.close(this);
  }

  dismiss() {
    if (this.dismissible) {
      this.resolve(this.options.open.cancel);
      return true;
    }
    return false;
  }

  onBeforeNavigate(navigation: BeforeNavigate) {
    if (this.dismissible) {
      this.dismiss();
    } else {
      navigation.cancel();
    }
  }

  promise = $derived(this.deferred.promise);
}
