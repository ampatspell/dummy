<script lang="ts" module>
  import { getter, options, type OptionsInput } from '$base/lib/utils/options';
  import { createContext } from '$base/lib/utils/context';

  export type PageContextOptions = {
    icon: Component;
  };

  export class PageContext {
    private readonly options: PageContextOptions;
    constructor(opts: OptionsInput<PageContextOptions>) {
      this.options = options(opts);
    }

    get icon() {
      return this.options.icon;
    }
  }

  let { get: getPageContext, set: setPageContext } = createContext<PageContext>('page');

  export { getPageContext };

  export const createPageContext = (opts: OptionsInput<PageContextOptions>) => {
    return setPageContext(new PageContext(opts));
  };
</script>

<script lang="ts">
  import Icon from '$base/components/dark/icon.svelte';
  import type { Component, Snippet } from 'svelte';
  import Placeholder from './placeholder.svelte';

  let {
    title,
    icon,
    actions,
    children,
  }: {
    title: string;
    icon: Component;
    actions?: Snippet;
    children?: Snippet;
  } = $props();

  createPageContext({
    icon: getter(() => icon),
  });
</script>

<div class="page">
  <div class="header">
    <div class="section left">
      <Icon {icon} />
      <div class="title">{title}</div>
    </div>
    {#if actions}
      <div class="section right">
        {@render actions()}
      </div>
    {/if}
  </div>
  <div class="content">
    {#if children}
      {@render children()}
    {:else}
      <Placeholder />
    {/if}
  </div>
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .header {
      display: flex;
      flex-direction: row;
      gap: 10px;
      border-bottom: 1px solid var(--dark-border-color-1);
      > .section {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px;
        gap: 10px;
        &.left {
          flex: 1;
          > .title {
            font-weight: 600;
          }
        }
      }
    }
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
