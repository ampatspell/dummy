<script lang="ts">
  import Page from '$lib/page/page.svelte';
  import type { GridBlockDefinition, PageDefinition, PlaceholderBlockDefinition, TextBlockDefinition } from '$lib/types';

  let message: TextBlockDefinition = {
    type: 'text',
    value: 'Hey there',
  };

  let placeholder: PlaceholderBlockDefinition = {
    type: 'placeholder',
    width: { value: 100, unit: '%' },
    height: { value: 100, unit: 'px' },
  }

  let grid: GridBlockDefinition = {
    type: 'grid',
    gap: { horizontal: { value: 10, unit: 'px' }, vertical: { value: 10, unit: 'px' } },
    columns: [
      {
        value: 1,
        unit: 'fr',
      },
      {
        value: 1,
        unit: 'fr',
      },
    ],
    rows: [
      'auto',
      'auto'
    ],
    areas: [
      {
        placement: {
          start: { column: 1, row: 1 },
          end: { column: 1, row: 1 },
        },
        block: message,
      },
      {
        placement: {
          start: { column: 2, row: 1 },
          end: { column: 2, row: 1 },
        },
        block: placeholder,
      },
      {
        placement: {
          start: { column: 1, row: 2 },
          end: { column: 3, row: 2 },
        },
        block: placeholder,
      }
    ],
  };

  let page: PageDefinition = {
    block: grid,
  };
</script>

<Page definition={page} />
