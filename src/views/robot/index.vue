<template>
  <div class="robot-container">
    <!-- 标题 -->
    <titl/>
    <div class="r-container">
      <container1/>
    </div>
    <div class="r-container">
      <container2/>
    </div>
    <div class="r-container">1</div>
  </div>
</template>

<script>
  // var echarts = require('echarts');
  // title属于默认关键词，不能使用title
  import Titl from "./title.vue"
  import Container1 from "./container1.vue" 
  import Container2 from "./container2.vue" 
  export default {
  	data() {
        return {
            tableData: [{
            date: '警报',
            address: ''
          }, {
             date: '烟雾',
             address: ''
          }, {
             date: '温度',
             address: '0'
          }, {
             date: '湿度',
             address: '0'
          }, {
             date: 'CO2',
             address: '0'
          }],
          input: '',
          highTemperature: '',
          lowTemperature: '',
          highHumidity: '',
          lowHumidity: '',
          highCO2: '',
          lowCO2: '0',
          pubarr:['/voice/switch', '/voice/say', '/set/params', '/sensor/data'],
          height: 400,
         
        }
    },
    components: {
      Container1,
      Container2,
      Titl

    }
  }
</script>

<style lang="scss" scoped>

.robot-container {
  position: absolute;
    left: 0px;
    right: 0px;
    height: 100%;
    color: black;
}


</style>
