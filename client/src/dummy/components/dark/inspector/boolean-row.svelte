<script lang="ts">
  import { getter } from '$dummy/lib/utils/options';
  import { toOptional } from '$dummy/lib/utils/property-wrappers';
  import { Property } from '$dummy/lib/utils/property.svelte';
  import DropdownRow from './dropdown-row.svelte';

  let {
    label,
    property,
  }: {
    label: string;
    property: Property<boolean | undefined>;
  } = $props();

  type Value = 'true' | 'false';

  let string = new Property<Value | undefined>({
    delegate: getter(() => property.delegate),
    value: getter(() => {
      return property.value ? 'true' : 'false';
    }),
    update: (value) => {
      property.update(value === 'true');
    },
  });

  let items: Value[] = ['true', 'false'];
  let labels = {
    true: 'Yes',
    false: 'No',
  };
</script>

<DropdownRow {label} property={string} {items} {labels} />
