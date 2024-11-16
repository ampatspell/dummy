<script lang="ts">
  import Column from '$dummy/components/dark/inspector/column.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import Row from '$dummy/components/dark/inspector/row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import ValueRow from '$dummy/components/dark/inspector/value-row.svelte';
  import Page from '$dummy/components/dark/section/page/page.svelte';
  import type { UserModel } from '$dummy/lib/users/user.svelte';
  import Button from '$dummy/components/dark/button.svelte';
  import { type VoidCallback } from '$dummy/lib/utils/types';
  import { getSession } from '$dummy/lib/session/session.svelte';
  import { isTruthy } from '$dummy/lib/utils/array';

  let { user }: { user: UserModel } = $props();

  let session = getSession();
  let isMe = $derived(user.id === session.user?.uid);

  let title = $derived.by(() => {
    return [user.email ?? user.id, isMe && '(You)'].filter(isTruthy).join(' ');
  });

  let isBusy = $state(false);

  let onRole = async (role: string) => {
    isBusy = true;
    try {
      await session.setRole(user.id, role);
    } finally {
      isBusy = false;
    }
  };

  let onRevoke = async () => {
    await onRole('visitor');
  };

  let onPromote = async () => {
    await onRole('admin');
  };
</script>

{#snippet button(label: string, onClick: VoidCallback)}
  <Row>
    <Column>
      <Button {label} {onClick} isDisabled={isBusy} />
    </Column>
  </Row>
{/snippet}

<Page {title}>
  <Inspector>
    <Section>
      <ValueRow label="UID" value={user.id} />
      <ValueRow label="Email" value={user.email} />
      <ValueRow label="Role" value={user.role ?? 'visitor'} />
    </Section>
    {#if !isMe}
      <Section>
        {#if user.isAdmin}
          {@render button('Revoke admin role', onRevoke)}
        {:else}
          {@render button('Promote to admin', onPromote)}
        {/if}
      </Section>
    {/if}
  </Inspector>
</Page>
