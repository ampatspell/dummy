<script lang="ts" module>
  import { createContext } from '$base/lib/utils/context';
  import { getter, options, type OptionsInput } from '$base/lib/utils/options';

  export type GalleryContextOptions = {
    id: string;
  };

  export class GalleryContext {
    private readonly options: GalleryContextOptions;
    constructor(opts: OptionsInput<GalleryContextOptions>) {
      this.options = options(opts);
    }

    readonly id = $derived.by(() => this.options.id);

    readonly gallery = $derived.by(() =>
      buildGalleryByIdModel({
        id: this.id,
      }),
    );
  }

  let { get: getGalleryContext, set: setGalleryContext } = createContext<GalleryContext>('gallery');

  export const createGalleryContext = (opts: OptionsInput<GalleryContextOptions>) => {
    return setGalleryContext(new GalleryContext(opts));
  };

  export { getGalleryContext };
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { buildGalleryByIdModel } from '$base/lib/galleries/gallery.svelte';
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  let context = createGalleryContext({
    id: getter(() => data.id),
  });

  $effect(() => subscribe(context.gallery));

  let isLoaded = $derived(context.gallery);
</script>

{#if isLoaded}
  {@render children()}
{/if}
