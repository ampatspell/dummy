<script lang="ts">
	let { data } = $props();
</script>

<div class="page">
	<div class="images">
		{#each data.images as image}
			<div class="image" style:--url="url({image.data.sizes['2048x2048'].url})"></div>
		{/each}
	</div>
</div>

<style lang="scss">
	.page {
		padding: 10px 0;
		> .images {
			display: flex;
			flex-direction: column;
			gap: 30px;
			> .image {
				width: 100%;
				height: calc(100vh - 20px);
				background-image: var(--url);
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center center;
			}
		}
	}
</style>
