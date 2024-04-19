<script lang="ts">
	let { data } = $props();
</script>

<div class="page">
	<div class="images">
		{#each data.images as image}
			<div class="image">
				<img class="img" src={image.data.sizes['2048x2048'].url} alt={image.data.name} />
				<div class="name">{image.data.name}</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.page {
		padding: 10px 0;
		> .images {
			display: flex;
			flex-direction: column;
			gap: 25px;
			> .image {
				width: 100%;
				display: flex;
				flex-direction: column;
				gap: 5px;
				align-items: center;
				> .img {
					object-fit: contain;
					width: 100%;
					max-height: calc(100vh - 100px);
				}
				> .name {
					font-size: 11px;
				}
			}
		}
	}
</style>
