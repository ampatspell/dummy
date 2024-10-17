<script lang="ts">
  import Page from '$lib/components/page/page.svelte';

  let identifier = $state('hello');
</script>

<Page {identifier} />
