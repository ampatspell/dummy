import { Model } from '$base/lib/firebase/fire/model.svelte';
import { createContext } from '$base/lib/utils/context';
import type { OptionsInput } from '$base/lib/utils/options';
import type { Component } from 'svelte';

export type SectionContextOptions = {
  icon: Component;
};

export class SectionContext extends Model<SectionContextOptions> {
  icon = $derived(this.options.icon);
}

const { get: getSectionContext, set: setSectionContext } = createContext<SectionContext>('section');

const createSectionContext = (opts: OptionsInput<SectionContextOptions>) => {
  return setSectionContext(new SectionContext(opts));
};

export { getSectionContext, createSectionContext };
