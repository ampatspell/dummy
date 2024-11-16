<script lang="ts">
  import type { Snippet } from 'svelte';
  import Section from '$dummy/components/dark/section/section.svelte';
  import LucideUser from '$dummy/components/icons/lucide--user.svelte';
  import type { UsersModel } from '$dummy/lib/users/users.svelte';
  import Table from '$dummy/components/dark/table/table.svelte';
  import Cell from '$dummy/components/dark/table/cell.svelte';
  import Row from '$dummy/components/dark/table/row.svelte';
  import Content from '$dummy/components/dark/table/content.svelte';
  import Accessories from '$dummy/components/dark/table/accessories.svelte';
  import LucideSquareCode from '$dummy/components/icons/lucide--square-code.svelte';
  import Icon from '$dummy/components/dark/icon.svelte';
  import type { UserModel } from '$dummy/lib/users/user.svelte';

  let {
    id,
    users,
    children,
  }: {
    id: string | undefined;
    users: UsersModel;
    children: Snippet;
  } = $props();

  let route = (user: UserModel) => `/backend/settings/users/${user.id}`;
</script>

{#snippet sidebar()}
  <Table>
    {#each users.all as user}
      <Cell route={route(user)} isSelected={user.id === id}>
        <Row>
          <Content>
            {user.email ?? 'anonymous'}
          </Content>
          {#if user.isAdmin}
            <Accessories>
              <Icon icon={LucideSquareCode} />
            </Accessories>
          {/if}
        </Row>
      </Cell>
    {/each}
  </Table>
{/snippet}

<Section title="Users" icon={LucideUser} {sidebar} type="nested">
  {@render children()}
</Section>
