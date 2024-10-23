<script lang="ts">
  import type { PageModel } from '$base/lib/pages/page.svelte';
  import type { VoidCallback } from '$base/lib/utils/types';
  import Actions from '../../page/form/actions/actions.svelte';
  import Save from '../../page/form/actions/save.svelte';
  import InputField from '../../page/form/field/input-field.svelte';
  import Form from '../../page/form/form.svelte';
  import Row from '../../page/form/row.svelte';
  import Page from '../../page/page.svelte';

  let { page, onSaved }: { page: PageModel; onSaved: VoidCallback } = $props();

  let properties = $derived(page.properties);
  let name = $derived(properties.name);

  let onSave = async () => {
    await page.save();
    onSaved();
  };
</script>

<Page title="New page">
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
