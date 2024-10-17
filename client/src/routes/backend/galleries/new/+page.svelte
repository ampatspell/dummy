<script lang="ts">
  import { goto } from '$app/navigation';
  import Actions from '$base/components/backend/page/form/actions/actions.svelte';
  import Save from '$base/components/backend/page/form/actions/save.svelte';
  import InputField from '$base/components/backend/page/form/field/input-field.svelte';
  import Form from '$base/components/backend/page/form/form.svelte';
  import Row from '$base/components/backend/page/form/row.svelte';
  import Page from '$base/components/backend/page/page.svelte';
  import LucideImages from '$base/components/icons/lucide--images.svelte';
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { buildNewGalleryModel } from '$base/lib/galleries/gallery.svelte';
  import { setGlobal } from '$base/lib/utils/set-global';

  let gallery = buildNewGalleryModel({
    data: {
      name: 'Untitled',
    },
  });

  $effect(() => subscribe(gallery));
  setGlobal({ gallery });

  let properties = $derived(gallery.properties);
  let name = $derived(properties.name);

  let onSave = async () => {
    await gallery.save();
    await goto(`/backend/galleries/${gallery.id}`);
  };
</script>

<Page title="New gallery" icon={LucideImages}>
  <Form type="center" {onSave}>
    <Row>
      <InputField property={name} />
    </Row>
    <Row>
      <Actions>
        <Save label="Create" />
      </Actions>
    </Row>
  </Form>
</Page>
