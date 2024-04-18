<script lang="ts">
	import type { Document, GalleryData } from '$lib/types';

	let {
		galleries
	}: {
		galleries: Document<GalleryData>[];
	} = $props();
</script>

<div class="sidebar">
	<div class="header">
		<a class="title" href="/">§</a>
	</div>
	<div class="galleries">
		{#each galleries as gallery}
			<a class="gallery" href="/galleries/{gallery.id}">{gallery.data.name}</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.sidebar {
		flex: 1;
		width: 100%;
		padding: 10px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		> .header {
			> .title {
				text-decoration: none;
				font-weight: 600;
			}
		}
		> .galleries {
			display: flex;
			flex-direction: column;
			gap: 5px;
			> .gallery {
				text-decoration: none;
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>
