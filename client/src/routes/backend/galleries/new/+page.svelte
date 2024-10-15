<script lang="ts">
  import Page from '$base/components/backend/page/page.svelte';
  import LucideImages from "$base/components/icons/lucide--images.svelte";
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { GalleryModel, buildGalleryDocument } from '$base/lib/galleries/gallery.svelte';
    import { setGlobal } from '$base/lib/utils/set-global';

  let gallery = new GalleryModel({
    doc: buildGalleryDocument({
      name: 'Untitled',
    }),
  });

  $effect(() => subscribe(gallery))
  setGlobal({ gallery });
</script>

<Page title="New gallery" icon={LucideImages}>
</Page>
