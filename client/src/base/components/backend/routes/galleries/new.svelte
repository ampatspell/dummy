<script lang="ts">
  import LucideImages from '$base/components/icons/lucide--images.svelte';
  import type { GalleryModel } from '$base/lib/galleries/gallery.svelte';
  import type { VoidCallback } from '$base/lib/utils/types';
  import Actions from '../../page/form/actions/actions.svelte';
  import Save from '../../page/form/actions/save.svelte';
  import InputField from '../../page/form/field/input-field.svelte';
  import Form from '../../page/form/form.svelte';
  import Row from '../../page/form/row.svelte';
  import Page from '../../page/page.svelte';

  let { gallery, onSaved }: { gallery: GalleryModel; onSaved: VoidCallback } = $props();

  let properties = $derived(gallery.properties);
  let name = $derived(properties.name);

  let onSave = async () => {
    await gallery.save();
    onSaved();
  };
</script>

<Page title="New gallery">
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
