<template>
  <div>
  	<!-- 轮播图 -->
      <swipe></swipe>
      <row1></row1>
  </div>
</template>

<script>
	import Swipe from './swiper.vue'
	import Row1 from './row1.vue'
export default {
	components: {
		Swipe,
		Row1,
	}
}
</script>

<style scoped>
h3 {
    text-align: center;
}
</style>