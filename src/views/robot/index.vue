<template>
  <div class="robot-container">
    <titl/>
    <div class="robot-subcontainer">     
      <el-row :gutter="20">
        <el-col :span="6">
          <dashboard/>
        </el-col>
        <el-col :span="10">
        	
        </el-col>
        <el-col :span="8">111111</el-col>
      </el-row>
    </div>   
  </div>
</template>

<script>
  var echarts = require('echarts');
  // title属于默认关键词，不能使用title
  import Titl from "./title.vue"
  import Dashboard from "./dashboard.vue"
  import Curve from "./curve.vue"
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
      Titl,
      Dashboard,
      Curve
    }
  }
</script>

<style lang="scss" scoped>

.robot-container {
    width: 100%;
    height: 1000px;
    background: url("../../assets/robot_images/mainPicture.png") center center no-repeat;
    color: white;
    // min-width: 1000px;  
}
.robot-subcontainer {
   padding: 10px;
}

</style>
