<script lang="ts">
  import Page from '$lib/page/page.svelte';

  let identifier = $state('hello');
</script>

<Page {identifier} />
