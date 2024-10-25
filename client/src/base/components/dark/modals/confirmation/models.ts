import { getter, options, type OptionsInput } from '$base/lib/utils/options';
import type { ModalsContext } from '../models/context.svelte';
import Confirmation from './component.svelte';

export type ConfirmationProps = {
  title: string;
  confirm: string;
  cancel?: string;
};

export type ConfirmationResolution = boolean;

export const openConfirmationModal = (modals: ModalsContext, props: OptionsInput<ConfirmationProps>) => {
  return modals.open({
    component: Confirmation,
    props: props,
    block: true,
    cancel: false,
  });
};

export const withConfirmationModal = async <T>(
  modals: ModalsContext,
  props: OptionsInput<ConfirmationProps> & { onConfirmed: () => Promise<T> },
) => {
  if (await openConfirmationModal(modals, props)) {
    return await props.onConfirmed();
  }
};

export const withDeleteConfirmationModal = async <T>(
  modals: ModalsContext,
  props: OptionsInput<{ name: string; onConfirmed: () => Promise<T> }>,
) => {
  const opts = options(props);
  return await withConfirmationModal(modals, {
    title: getter(() => `Delete ${props.name}?`),
    confirm: 'Delete',
    onConfirmed: () => opts.onConfirmed(),
  });
};
