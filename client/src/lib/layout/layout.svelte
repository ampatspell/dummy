<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Document, GalleryData } from '$lib/types';
	import Header from './header.svelte';

	let {
		galleries,
		children
	}: {
		galleries: Document<GalleryData>[];
		children: Snippet;
	} = $props();
</script>

<div class="layout">
	<div class="header">
		<Header {galleries} />
	</div>
	<div class="content">{@render children()}</div>
</div>

<style lang="scss">
	.layout {
		$w: 1920px;
		width: $w;
		@media (max-width: $w) {
			width: 100%;
		}
		flex: 1;
		display: flex;
		flex-direction: column;
		align-self: center;
		gap: 20px;
		padding: 20px;
		> .content {
			flex: 1;
		}
	}
</style>
