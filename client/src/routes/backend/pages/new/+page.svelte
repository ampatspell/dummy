<script lang="ts">
  import { goto } from '$app/navigation';
  import New from '$base/components/backend/routes/pages/new.svelte';
  import { subscribe } from '$base/lib/firebase/fire/subscriber.svelte';
  import { buildNewPageModel } from '$base/lib/pages/page.svelte';

  let page = buildNewPageModel({
    data: {
      name: 'Untitled',
    },
  });

  $effect(() => subscribe(page));

  let onSaved = () => {
    goto(`/backend/pages/${page.id}`);
  };
</script>

<New {page} {onSaved} />
