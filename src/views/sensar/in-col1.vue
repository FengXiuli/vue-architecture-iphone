<template>
	<div class="incol1" >
		<incol1-card1/>
		<incol1-card2/>
		<span class="ok" @click="op=!op">点击</span>
		<transition>
			<div v-if="op" class="open">11</div>
		</transition>
	</div>
</template>

<script>
	import Incol1Card1 from './incol1-card1.vue' 
	import Incol1Card2 from './incol1-card2.vue' 
	export default {
		components: {
			Incol1Card1,
			Incol1Card2,
		},
		data() {
			return {
				op: false
			}
		}
	}
</script>

<style scoped lang="scss">
	.open {
		width: 600px;
	height: 100px;
	background: green;
	position: absolute;
	left: 0;
	}
	
</style>