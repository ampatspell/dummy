import { createContext } from '$lib/utils/context';
import { options, type OptionsInput } from '$lib/utils/options';

export type TreeContextOptions<T> = {
  isSelected: (model: T) => boolean;
  onSelect: (model?: T) => void;
};

export class TreeContext<T = unknown> {
  options: TreeContextOptions<T>;

  constructor(opts: OptionsInput<TreeContextOptions<T>>) {
    this.options = options(opts);
  }

  isSelected = $derived.by(() => this.options.isSelected);

  onSelect(model?: T) {
    this.options.onSelect(model);
  }
}

export const treeContext = createContext('tree');
