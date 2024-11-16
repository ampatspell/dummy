<script lang="ts">
  import Users from '$dummy/components/backend/routes/settings/users/users.svelte';
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';

  let {
    data,
    children,
  }: {
    data: LayoutData;
    children: Snippet;
  } = $props();

  let id = $derived(data.id);
  let users = $derived(data.users);
  $effect(() => subscribe(users));
</script>

<Users {id} {users}>
  {@render children()}
</Users>
