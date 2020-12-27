<template>
	<div class="h-row1">
		<div class="container">
			<div class="col col1">1</div>
			<div class="col col2">1</div>
			<div class="col col3">1</div>
		</div>
	</div>
</template>

<script>
	
</script>

<style scoped lang="scss">
.h-row1 {
	.container {
		width: 100%;
		height: 180px;
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		// background: #eef0f1;
		.col {
			width: 32%;
			border: 1px solid rgba(59, 56, 56, 0.68);
			// background: #eef0f1;
			box-shadow: 0 0 0 0 rgba(59, 56, 56, 0.68);
			border-radius: 6px;
			// position: absolute;
			// left: -14%;
		}
		.col1 {
			// border: none;
		}
	}

}	
</style>