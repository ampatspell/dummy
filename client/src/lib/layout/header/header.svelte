<script lang="ts">
  let {
    name,
    description,
  }: {
    name: string;
    description: string;
  } = $props();
</script>

<div class="header">
  <div class="content">
    <div class="title">
      <a class="link" href="/">{name}</a>
      <div class="description">{description}</div>
    </div>
  </div>
</div>

<style lang="scss">
  .header {
    padding: 50px;
    display: flex;
    flex-direction: column;
    > .content {
      display: flex;
      flex-direction: row;
      gap: 10px;
      > .title {
        font-size: max(min(2vw, 21px), 14px);
        font-weight: 500;
        text-transform: uppercase;
        flex: 1;
        display: flex;
        flex-direction: row;
        gap: 10px;
        > .link {
          text-decoration: none;
        }
        > .description {
          color: fade-out(#000, 0.75);
        }
      }
    }
    @media(max-width: 500px) {
      padding: 10px;
    }
  }
</style>
