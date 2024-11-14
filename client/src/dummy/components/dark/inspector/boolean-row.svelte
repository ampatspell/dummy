<script lang="ts">
  import { Property, toOptional, transform } from '$dummy/lib/utils/property.svelte';
  import DropdownRow from './dropdown-row.svelte';

  let {
    label,
    property,
  }: {
    label: string;
    property: Property<boolean>;
  } = $props();

  type Value = 'true' | 'false';

  let string = toOptional(
    transform<boolean, Value>(property, {
      toSource: (value) => value === 'true',
      toTarget: (value) => (value ? 'true' : 'false'),
    }),
    'false',
  );

  let items: Value[] = ['true', 'false'];
  let labels = {
    true: 'Yes',
    false: 'No',
  };
</script>

<DropdownRow {label} property={string} {items} {labels} />
