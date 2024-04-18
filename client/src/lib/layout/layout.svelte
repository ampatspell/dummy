<script lang="ts">
	import type { Snippet } from 'svelte';
	import Sidebar from './sidebar.svelte';
	import type { Document, GalleryData } from '$lib/types';

	let {
		galleries,
		children
	}: {
		galleries: Document<GalleryData>[];
		children: Snippet;
	} = $props();
</script>

<div class="layout">
	<div class="sidebar">
		<Sidebar {galleries} />
	</div>
	<div class="content">{@render children()}</div>
</div>

<style lang="scss">
	.layout {
		flex: 1;
		display: flex;
		flex-direction: row;
		> .sidebar {
			width: 200px;
			display: flex;
			flex-direction: column;
		}
		> .content {
			flex: 1;
		}
	}
</style>
