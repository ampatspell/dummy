<script lang="ts">
  import Section from "$dummy/components/dark/section/section.svelte";
  import LucideFileTerminal from "$dummy/components/icons/lucide--file-terminal.svelte";
</script>

<Section title="Dev" icon={LucideFileTerminal}>
  <div class="page">
  </div>
</Section>

<style lang="scss">
  .page {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
</style>
