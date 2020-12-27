<template>
  <div class="sensor-container">
  	   <titl/>
  	   <incol1-card1/>
  	   <incol1-card2/>
  	   <incol1-card3/>
  </div>
</template>


<script>

	import Titl from './title.vue'
	import Incol1Card1 from './incol1-card1.vue'
	import Incol1Card2 from './incol1-card2.vue'
	import Incol1Card3 from './incol1-card3.vue'
export default {
	components: {
		Titl,
		Incol1Card1,
		Incol1Card2,
		Incol1Card3
	}
}
</script>

<style scoped lang="scss">
.sensor-container {
  position: absolute;
    left: 0px;
    right: 0px;
    height: 1000px;
    color: black;
}
</style>
