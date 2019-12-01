<template>
	<div class="robot-dashboard">
		<el-row>
			<el-card class="box-card">
         <div class="dashboard-temperature" ref="myechartTemperate" ></div>
			</el-card>
			<el-card class="box-card">
        <div class="dashboard-co2" ref="myechartCO2"></div>
			</el-card>
			<el-card class="box-card">
        <div class="dashboard-humidity" ref="myechartHumidity"></div>
			</el-card>
		</el-row>
	</div>
</template>

<script>
import EventEmitter2 from '@/lib/eventemitter2.min.js'
import RosLib from '@/lib/roslib.min.js'

// var echarts = require('echarts');
import echarts from "echarts"
//连接ros
 var ros = new ROSLIB.Ros({
    url : 'ws://192.168.1.145:9090'
  });
  //监测是否连接成功
  ros.on('connection', function() {
    console.log('Connected to websocket server...');
  });
   //监测是否连接失败
  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });
  //监测是否关闭
  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });
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
    mounted: function(){
      
        this.dashboardTemperate(),
        this.dashboardHumidity(),
        this.dashboardCO2()
     
     
     
     // this.curveTemperate(),
     // this.curveHumidity(),
     // this.curveCO2()
     
    },
    methods: {
         dashboardTemperate() {
          let myechartTemperate = this.$echarts.init(this.$refs.myechartTemperate) //初始化一个echarts
           // 仪表盘
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}℃"
            },
            toolbox: {
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                },
                iconStyle: {
                    borderColor: '#fff',
                },
            },
            series: [
                {
                    name: '温度',
                    radius: '96%',
                    min: -20,
                    max: 90,
                    type: 'gauge',
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                            width: 8,
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 15
                        }
                    },
                    splitLine: {
                        length: 15
                    },
                    axisLabel: {            // 坐标轴小标记
                        textStyle: {       // 属性lineStyle控制线条样式
                            fontWeight: 'bolder',
                            // color: '#fff',
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    pointer: {
                        width: 6
                    },
                    title: {
                        color: '#fff'
                    },
                    detail: {formatter:'{value}'},
                    data: [{value: 0, name: '温度'}]
                }
            ]
        };
        // console.log("okwww"+document.getElementById('myechartTemperate'))
       
          
          myechartTemperate.setOption(option,true);
          // 订阅一个话题
        var listener = new ROSLIB.Topic({
          ros : ros,
          name : this.pubarr[3],
          messageType : 'std_msgs/String'
        });

        listener.subscribe(function(message) {
          console.log('Received message on ' + listener.name + ': ' + message.data);
          const str = message.data.slice(19,-2) 
              const array = str.split(",")
          option.series[0].data[0].value = array[2];
            myechartTemperate.setOption(option,true);
        });
      },
      dashboardCO2() {
           // 仪表盘
      var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}ppm"
            },
            toolbox: {
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                },
                iconStyle: {
                    borderColor: '#fff',
                },
            },
            series: [
                {
                    name: 'CO2',
                    radius: '96%',
                    min: 0,
                    max: 1000,
                    type: 'gauge',
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                            width: 8,
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 15
                        }
                    },
                    splitLine: {
                        length: 15
                    },
                    axisLabel: {            // 坐标轴小标记
                        textStyle: {       // 属性lineStyle控制线条样式
                            fontWeight: 'bolder',
                            // color: '#fff',
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    pointer: {
                        width: 6
                    },
                    title: {
                        color: '#fff'
                    },
                    detail: {formatter:'{value}'},
                    data: [{value: 0, name: 'CO2'}]
                }
            ]
        };
       let myechartCO2 = this.$echarts.init(this.$refs.myechartCO2) //初始化一个echarts
        myechartCO2.setOption(option,true);
          // 订阅一个话题
        var listener = new ROSLIB.Topic({
          ros : ros,
          name : this.pubarr[3],
          messageType : 'std_msgs/String'
        });

        listener.subscribe(function(message) {
          console.log('Received message on ' + listener.name + ': ' + message.data);
          const str = message.data.slice(19,-2) 
              const array = str.split(",")
          option.series[0].data[0].value = array[4];
            myechartCO2.setOption(option,true);
        });
    

      },
      dashboardHumidity() {
           // 仪表盘
      var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%RH"
            },
            toolbox: {
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                },
                iconStyle: {
                    borderColor: '#fff',
                },
            },
            series: [
                {
                    name: '湿度',
                    radius: '96%',
                    min: 0,
                    max: 200,
                    type: 'gauge',
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                            width: 8,
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 15
                        }
                    },
                    splitLine: {
                        length: 15
                    },
                    axisLabel: {            // 坐标轴小标记
                        textStyle: {       // 属性lineStyle控制线条样式
                            fontWeight: 'bolder',
                            // color: '#fff',
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    pointer: {
                        width: 6
                    },
                    title: {
                        color: '#fff'
                    },
                    detail: {formatter:'{value}'},
                    data: [{value: 0, name: '湿度'}]
                }
            ]
        };
       let myechartHumidity = this.$echarts.init(this.$refs.myechartHumidity) //初始化一个echarts
          myechartHumidity.setOption(option,true);
          // 订阅一个话题
        var listener = new ROSLIB.Topic({
          ros : ros,
          name : this.pubarr[3],
          messageType : 'std_msgs/String'
        });

        listener.subscribe(function(message) {
          console.log('Received message on ' + listener.name + ': ' + message.data);
          const str = message.data.slice(19,-2) 
              const array = str.split(",")
          option.series[0].data[0].value = array[3];
            myechartHumidity.setOption(option,true);
        });
    

      },
    }
}
</script>

<style scoped lang="scss">
	.el-card {
	// background: yellow;
	  border: 1.5px solid #2c58a6;
    box-shadow: 0 0 10px #2c58a6;
    background-color: Blue4;
    opacity: 1;
    width: 100%;
    height: 205px;
}
.dashboard-temperature {
  width: 100%;
  height:206px;
}
.dashboard-co2 {
  width: 100%;
  height:206px;
}
.dashboard-humidity {
  width: 100%;
  height:206px;
}
</style>