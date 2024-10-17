<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import LucideCirclePlus from '$base/components/icons/lucide--circle-plus.svelte';

  let {
    route,
  }: {
    route: string;
  } = $props();
</script>

<a href={route}>
  <Icon icon={LucideCirclePlus} />
</a>
