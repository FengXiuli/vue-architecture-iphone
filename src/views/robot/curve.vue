<template>
  <div class="curve">
            <div class="line-box">
                <i class="t-l-line"></i>
                <i class="l-t-line"></i>
            </div>
            <div class="line-box">
                <i class="t-r-line"></i>
                <i class="r-t-line"></i>
            </div>
            <div class="line-box">
                <i class="l-b-line"></i>
                <i class="b-l-line"></i>
            </div>
            <div class="line-box">
                <i class="r-b-line"></i>
                <i class="b-r-line"></i>
            </div>
            <div class="curve-temperature" ref="mychartTemperature"></div>
            <div class="curve-co2" ref="mychartCO2"></div>
            <div class="curve-humidity" ref="mychartHumidity"></div>
        </div>
</template>

<script>

import EventEmitter2 from '@/lib/eventemitter2.min.js'
import RosLib from '@/lib/roslib.min.js'


var echarts = require('echarts');
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
             
        
        this.curveTemperate(),
         this.curveHumidity(),
         this.curveCO2() 
       
    },
    methods: {
         curveTemperate() {
        //表示间隔1000豪秒采集一次数据
        //接收服务端发布过来的信息，第一个参数：发布的主题，第二个参数：发布的内容
        let mychartTemperature = this.$echarts.init(this.$refs.mychartTemperature) //初始化一个echarts
        var option = {
            //标题组件，包含主标题和副标题。
                title: {
                    text: '温度',
                    textStyle: {
                        color:'#00BFFF'
                    }
                },
                grid: {
                    right:'3%'
                },

                //提示框组件
                tooltip: {
                    trigger: 'axis',//触发类型：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
                    //提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
                    formatter: function (params) {
                        params = params[0];
                        var date = new Date(params.name);
                        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];

                    },
                    //坐标轴指示器配置项。
                    axisPointer: {
                        animation: false
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {},
                        magicType: {
                            type: ['line', 'bar']
                        }
                    },
                    iconStyle: {
                        borderColor: '#fff',
                    },
                },
                xAxis: {
                    type: 'time',
                    name:'时间',
                    nameTextStyle: {
                        color:'#87CEFA '
                    },
                    nameLocation:'middle',
                    nameGap:40,
                    splitNumber:10,
                    axisLine:{
                        lineStyle: {
                            color:'#87CEFA'
                        },
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#87CEFA'
                        },
                    },
                    axisLabel: {
                        color: '#87CEFA'
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    name:'温度（℃）',
                    nameTextStyle: {
                        color:'#87CEFA '
                    },
                    nameLocation:'middle',
                    nameGap:45,
                    boundaryGap: [0, '100%'],
                    axisLine:{
                        lineStyle: {
                            color:'#87CEFA '
                        },
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#87CEFA'
                        },
                    },
                    axisLabel: {
                        color: '#87CEFA'
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    name: '模拟数据',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    itemStyle:{
                        borderColor: '#FFF',
                        borderWidth: 1
                    },
                    lineStyle: {
                        color:'#29B4F0',
                        
                    },
                    areaStyle: {
                        color:'rgba(0,155,255,0.3)'
                    },
                    data: [{value: 0},{name:''}]
                }]
            };
        mychartTemperature.setOption(option);

        var data = []

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
          function randomData() {
              now = now;
              value = value;
              return {
                  name: now.toString(),
                  value: [
                      now,
                      Math.round(value)
                  ]
              }
           }
              var now = +new Date();
              var oneDay = 1000;
              var value; 
              now = new Date(+now + oneDay); //显示的是当前的时间，每隔一秒显示一次，必须每隔一秒显示一次，否则时间是不准的
              value = array[2];
              //i < 5000 表示时间轴开始和结束之间的间隔为5000（具体单位不太清楚，总之不是毫秒）
              data[data.length]=randomData();
              if(data.length <= 10) {
                  
              } else if(data.length > 10) {
                data.splice(0,1)
              }
               console.log(data.length+'++'+data.value)

                mychartTemperature.setOption({
                    series: [{
                        data: data
                    }]
                });
        });      
      },
       curveCO2() {
//表示间隔1000豪秒采集一次数据
        //接收服务端发布过来的信息，第一个参数：发布的主题，第二个参数：发布的内容
        let mychartCO2 = this.$echarts.init(this.$refs.mychartCO2) //初始化一个echarts
        var option = {
        
            //标题组件，包含主标题和副标题。
                title: {
                    text: 'CO2浓度',
                    textStyle: {
                        color:'#00BFFF'
                    }
                },
                grid: {
                    right:'3%'
                },
                //提示框组件
                tooltip: {
                    trigger: 'axis',//触发类型：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
                    //提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
                    formatter: function (params) {
                        params = params[0];
                        var date = new Date(params.name);
                        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];

                    },
                    //坐标轴指示器配置项。
                    axisPointer: {
                        animation: false
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {},
                        magicType: {
                            type: ['line', 'bar']
                        }
                    },
                    iconStyle: {
                        borderColor: '#fff',
                    },
                },
                xAxis: {
                    type: 'time',
                    name:'时间',
                    nameTextStyle: {
                        color:'#87CEFA '
                    },
                    nameLocation:'middle',
                    nameGap:40,
                    splitNumber:10,
                    axisLine:{
                        lineStyle: {
                            color:'#87CEFA'
                        },
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#87CEFA'
                        },
                    },
                    axisLabel: {
                        color: '#87CEFA'
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    name:'CO2（ppm）',
                    nameTextStyle: {
                        color:'#87CEFA '
                    },
                    nameLocation:'middle',
                    nameGap:45,
                    boundaryGap: [0, '100%'],
                    axisLine:{
                        lineStyle: {
                            color:'#87CEFA '
                        },
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#87CEFA'
                        },
                    },
                    axisLabel: {
                        color: '#87CEFA'
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    name: '模拟数据',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    itemStyle:{
                        borderColor: '#FFF',
                        borderWidth: 1
                    },
                    lineStyle: {
                        color:'#29B4F0',
                        
                    },
                    areaStyle: {
                        color:'rgba(0,155,255,0.3)'
                    },
                    data: [{value: 0},{name:''}]
                }]
            };

            
        mychartCO2.setOption(option);
        var data = []
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
          function randomData() {
              now = now;
              value = value;
              return {
                  name: now.toString(),
                  value: [
                      now,
                      Math.round(value)
                  ]
              }
           }
              var now = +new Date();
              var oneDay = 1000;
              var value; 
              now = new Date(+now + oneDay); //显示的是当前的时间，每隔一秒显示一次，必须每隔一秒显示一次，否则时间是不准的
              value = array[4];
              //i < 5000 表示时间轴开始和结束之间的间隔为5000（具体单位不太清楚，总之不是毫秒）
              data[data.length]=randomData();
              if(data.length <= 10) {
                  
              } else if(data.length > 10) {
                data.splice(0,1)
              }
               console.log(data.length+'++'+data.value)

              mychartCO2.setOption({
                  series: [{
                      data: data
                  }]
              });
        }); 
       
      },
    curveHumidity() {
//表示间隔1000豪秒采集一次数据
        //接收服务端发布过来的信息，第一个参数：发布的主题，第二个参数：发布的内容
        let mychartHumidity = this.$echarts.init(this.$refs.mychartHumidity) //初始化一个echarts
        var option = {

            //标题组件，包含主标题和副标题。
                title: {
                    text: '湿度',
                    textStyle: {
                        color:'#00BFFF'
                    }
                },
                grid: {
                    right:'3%'
                },

                //提示框组件
                tooltip: {
                    trigger: 'axis',//触发类型：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
                    //提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
                    formatter: function (params) {
                        params = params[0];
                        var date = new Date(params.name);
                        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];

                    },
                    //坐标轴指示器配置项。
                    axisPointer: {
                        animation: false
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {},
                        magicType: {
                            type: ['line', 'bar']
                        }
                    },
                    iconStyle: {
                        borderColor: '#fff',
                    },
                },
                xAxis: {
                    type: 'time',
                    name:'时间',
                    nameTextStyle: {
                        color:'#87CEFA '
                    },
                    nameLocation:'middle',
                    nameGap:40,
                    splitNumber:10,
                    axisLine:{
                        lineStyle: {
                            color:'#87CEFA'
                        },
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#87CEFA'
                        },
                    },
                    axisLabel: {
                        color: '#87CEFA'
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    name:'湿度（%RH）',
                    nameTextStyle: {
                        color:'#87CEFA '
                    },
                    nameLocation:'middle',
                    nameGap:45,
                    boundaryGap: [0, '100%'],
                    axisLine:{
                        lineStyle: {
                            color:'#87CEFA '
                        },
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#87CEFA'
                        },
                    },
                    axisLabel: {
                        color: '#87CEFA'
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    name: '模拟数据',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    itemStyle:{
                        borderColor: '#FFF',
                        borderWidth: 1
                    },
                    lineStyle: {
                        color:'#29B4F0',
                        
                    },
                    areaStyle: {
                        color:'rgba(0,155,255,0.3)'
                    },
                    data: [{value: 0},{name:''}]
                }]
            };

            
             mychartHumidity.setOption(option);
        var data = []
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
          function randomData() {
              now = now;
              value = value;
              return {
                  name: now.toString(),
                  value: [
                      now,
                      Math.round(value)
                  ]
              }
           }
          var now = +new Date();
          var oneDay = 1000;
          var value; 
          now = new Date(+now + oneDay); //显示的是当前的时间，每隔一秒显示一次，必须每隔一秒显示一次，否则时间是不准的
          value = array[3];
          //i < 5000 表示时间轴开始和结束之间的间隔为5000（具体单位不太清楚，总之不是毫秒）
          data[data.length]=randomData();
          if(data.length <= 10) {
              
          } else if(data.length > 10) {
            data.splice(0,1)
          }
           console.log(data.length+'++'+data.value)
          mychartHumidity.setOption({
              series: [{
                  data: data
              }]
          });
        }); 
       
      }
    }
}
</script>

<style>

</style>