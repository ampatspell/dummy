<script lang="ts">
  import Input from '$base/components/dark/input.svelte';
  import type { Property } from '$base/lib/utils/property.svelte';
  import { getFormContext } from '../context.svelte';
  import Field from './field.svelte';

  let {
    property,
  }: {
    property: Property<string>;
  } = $props();

  let context = getFormContext();
  let value = $derived(property.value);
  let onInput = (value: string) => property.update(value);
  let isDisabled = $derived(context.isPropertyDisabled(property));
</script>

<Field {property}>
  <Input {value} {onInput} {isDisabled} />
</Field>
