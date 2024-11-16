<script lang="ts">
  import User from '$dummy/components/backend/routes/settings/users/user/user.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let user = $derived(data.user);
</script>

<User {user} />
