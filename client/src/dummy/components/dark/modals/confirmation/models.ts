import { getter, options, type OptionsInput } from '$dummy/lib/utils/options';
import type { ModalsContext } from '../base/context.svelte';
import type { Placement } from '../base/placement/placement.svelte';
import Confirmation from './component.svelte';

export type ConfirmationProps = {
  title: string;
  confirm: string;
  cancel?: string;
};

export type ConfirmationResolution = boolean;

export type OpenConfirmationModalOptions = ConfirmationProps & {
  placement?: Placement;
};

export const openConfirmationModal = (modals: ModalsContext, opts: OptionsInput<OpenConfirmationModalOptions>) => {
  const { title, confirm, cancel, placement } = opts;
  return modals.open({
    component: Confirmation,
    props: {
      title,
      confirm,
      cancel,
    },
    cancel: false,
    placement,
  });
};

export const withConfirmationModal = async <T>(
  modals: ModalsContext,
  props: OptionsInput<OpenConfirmationModalOptions> & { onConfirmed: () => Promise<T> },
) => {
  if (await openConfirmationModal(modals, props)) {
    return await props.onConfirmed();
  }
};

export const withDeleteConfirmationModal = async <T>(
  modals: ModalsContext,
  props: OptionsInput<{ name: string; onConfirmed: () => Promise<T>; placement?: Placement }>,
) => {
  const opts = options(props);
  return await withConfirmationModal(modals, {
    title: getter(() => `Delete ${opts.name}?`),
    confirm: 'Delete',
    placement: getter(() => opts.placement),
    onConfirmed: () => opts.onConfirmed(),
  });
};
