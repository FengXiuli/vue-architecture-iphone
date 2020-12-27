<template>
	<ul class="r-container1">
        <!-- 温度 -->
		<li class="li1">	
			<span class="indicate"><i class="el-icon-open"></i> Temperature</span>
			<p class="num">20.9</p>
			<div class="incol1-picture" @click="showModel=true"></div>	
			<div class="mask" v-show="showModel" @click="showModel=false"></div>	
			<transition name="fade">
  				<div class="pop" v-show="showModel">
  					<i class="el-icon-close close" @click="showModel=false"></i>
    				<span class="incol1-subtitle">Temperature</span>
    				<span class="incol1-subtitle1">Temperature</span>
    				<span class="incol1-subtitle2">20.9</span>
    				<div class="incol1-dashboard11">
    					<div class="incol1-dashboard1" ref="myechartTemperate"></div>
    				</div>
    				<div class="incol1-curve11">
    					<div class="incol1-curve1" ref="mychartTemperature">
    				</div>
    				</div>
    			</div>
  			</transition>	
		</li>
        <!-- CO2 -->
		<li class="li2">
			<span class="indicate"><i class="el-icon-open"></i> CO2 concentration</span>
			<p class="num">20</p>
			<div class="incol1-picture" @click="showModel2=true"></div>	
			<div class="mask" v-show="showModel2" @click="showModel2=false"></div>	
			<transition name="fade">
  				<div class="pop" v-show="showModel2">
  					<i class="el-icon-close close" @click="showModel2=false"></i>
    				<span class="incol1-subtitle">CO2 concentration</span>
    				<span class="incol1-subtitle1">CO2 concentration</span>
    				<span class="incol1-subtitle2">20.9</span>
    				<div class="incol1-dashboard22">
    					<div class="incol1-dashboard2" ref="myechartCO2"></div>
    				</div>
    				<div class="incol1-curve22">
    					<div class="incol1-curve2" ref="mychartCO2">
    				</div>
    				</div>
    			</div>
  			</transition>
		</li>
	</ul>
</template>

<script>
    // 导入ROS库
  import EventEmitter2 from '@/lib/eventemitter2.min.js'
  import RosLib from '@/lib/roslib.min.js'
  // 引入echarts
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
  	components: {
  	},
  	data() {
			return {
				showModel: false,
				showModel2: false,
				pubarr:['/voice/switch', '/voice/say', '/set/params', '/sensor/data'],
				height: 400,
			}
	},
	mounted: function() {     
        this.dashboardTemperate(),
        this.curveTemperate(),
        this.dashboardCO2(),
        this.curveCO2() 
    },
    methods: {
        // 温度仪表盘
    	dashboardTemperate() {
            //初始化一个echarts
        let myechartTemperate = this.$echarts.init(this.$refs.myechartTemperate) 
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}℃"
            },
            series: [
                {
                    name: '温度',
                    radius: '86%',
                    center: ['50%', '50%'],
                    min: -20,
                    max: 90,
                    type: 'gauge',
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                            width: 6,
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    splitLine: {
                        length: 15
                    },
                    axisLabel: {            // 坐标轴小标记
                        textStyle: {       // 属性lineStyle控制线条样式
                            fontWeight: 'normal',
                            // color: '#fff',
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 10,
                            fontSize: 8
                        }
                    },
                    pointer: {
                        width: 4
                    },
                    title: {
                        color: '#fff',
                        fontSize: 10
                    },
                    detail: {
                      formatter:'{value}',
                      textStyle: {
                        fontSize: 20
                      }
                    },
                    data: [{value: 0, name: '温度'}]
                }
            ]
        };
          myechartTemperate.setOption(option,true);

          // 订阅话题
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
      // CO2仪表盘
      dashboardCO2() {
      var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}ppm"
            },
            series: [
                {
                    name: 'CO2',
                    radius: '86%',
                    center: ['50%', '50%'],
                    min: 0,
                    max: 1000,
                    type: 'gauge',
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                            width: 6,
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    splitLine: {
                        length: 15
                    },
                    axisLabel: {            // 坐标轴小标记
                        textStyle: {       // 属性lineStyle控制线条样式
                            fontWeight: 'normal',
                            // color: '#fff',
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 10,
                            fontSize: 8
                        }
                    },
                    pointer: {
                        width: 4
                    },
                    title: {
                        color: '#fff',
                        fontSize: 10
                    },
                    // 示数显示
                    detail: {
                      formatter:'{value}',
                      textStyle: {
                        fontSize: 20
                      }
                    },
                    data: [{value: 0, name: 'CO2'}]
                }
            ]
        };
        //初始化一个echarts
        let myechartCO2 = this.$echarts.init(this.$refs.myechartCO2) 
        myechartCO2.setOption(option,true);
          // 订阅话题
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

      // 温度曲线
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
                	x: 40,
                	y: 40,
                	x2: 40,
                	y2: 60
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
                        color: '#87CEFA',
                        fontSize: 10
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
                        color: '#87CEFA',
                        fontSize: 10
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

     // 订阅话题
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

       // CO2曲线
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
                	x: 40,
                	y: 40,
                	x2: 40,
                	y2: 60
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
                        color: '#87CEFA',
                        fontSize: 10
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
                        color: '#87CEFA',
                        fontSize: 10
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
        // 订阅话题
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
       
      }
    }
  }	
</script>

<style scoped lang="scss">
.r-container1 {
	margin-top: 0;
	position: relative;
	left: 0;
	right: 0;

	li {
		list-style: none;
		width: 48.5%;
		height: 200px;
		background: #fff;
        box-shadow: 0 0 6px rgba(59, 56, 56, 0.68);
        font-size: 20px;
	}
	.li1 {
		position: absolute;
		left: 0;
		.indicate {
			margin-top: 10px;
			margin-left: 6%;
			display: block;
			color: #56595E;
		}
		.num {
			display: block;
			color: black;
			margin-left: 6%;
			font-size: 30px;
			margin-top: 10px;
		}
		.incol1-picture {
			width: 100%;
			height: 80px;
			background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575388141637&di=0ca27f1e2ed1fe064b950b410b710ad1&imgtype=0&src=http%3A%2F%2Fmx.meicloud.com%2Fask%2Fuploads%2Farticle%2F20171108%2F159565ef5cc9fa01db677b6b24542de5.gif") center top no-repeat ;
			background-size: contain;
			// background-position: top
		}
		
		.mask {
		  background-color: #000;
		  opacity: 0.5;
		  position: fixed;
		  top: 0;
		  left: 0;
		  right: 0;
		  // width: 100%;
		  height: 100%;
		  z-index: 1
		}
		.pop { 
		  background-color: #052341;
		  position: fixed;
		  top: 88px;
		  left: 0;
		  right: 0;
		  bottom: 118px;
		  z-index: 2;
		  .close {
		  	position: absolute;
		  	top: 8px;
		  	right: 8px;
		  	font-size: 21px;

		  }
		  .close:hover {
		  	color: #409EFF;
		  }
		  .incol1-subtitle {
		  	display: block;
		  	height: 71px;
		  	line-height: 71px;
		  	text-align: center;
		  	font-size: 24px;
			background: #e5e5e5;
		  }
		  .incol1-subtitle1 {
			position: absolute;
			left: 66px;
			margin: 10px;
			color: white;
		  }
		  .incol1-subtitle2 {
		  	position: absolute;
		  	right: 41px;
		  	margin: 10px;
		  	color: white;
		  }
		  .incol1-dashboard11 {
		  	width: 100%;
		  	height: 300px;
		  	box-shadow: 0 0 6px rgba(59, 56, 56, 0.68);
		  }
		  .incol1-dashboard1 {
		  	width: 300px;
		  	height: 300px;
		  	margin: 56px auto;
		  }
		  .incol1-curve11 {
		  	width: 100%;
		    height: 350px;
			box-shadow: 0 0 6px rgba(59, 56, 56, 0.68);
		  }
		  .incol1-curve1 {
		    width: 600px;
		    height: 350px;
		    margin: 56px auto;
		  }
		
		// 动画
		/*进入时的初始样式*/
		.fade-enter {
		  opacity: 0;
		  /*width: 100px;*/
		  height: 100px;
		}
		/*从进入开始到最终设置的样式之间经历的时间以及动画*/
		.fade-enter-active {
		  transition: all .4s ease;
		}
		/*从开始离开原始样式到离开之间经历的时间及动画*/
		.fade-leave-active {
		  transition: all .1s;	
		}
		/*离开时候的样式*/
		.fade-leave-to  {
		  opacity: 0;
		  /*width: 100px;*/
		  /*height: 800px;*/
		}
	}
	}
	.li2 {
		position: absolute;
		right: 0;
		.indicate {
			margin-top: 10px;
			margin-left: 6%;
			display: block;
			color: #56595E;
		}
		.num {
			display: block;
			color: black;
			margin-left: 6%;
			font-size: 30px;
			margin-top: 10px;
		}
		.incol1-picture {
			width: 100%;
			height: 80px;
			background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575388141637&di=0ca27f1e2ed1fe064b950b410b710ad1&imgtype=0&src=http%3A%2F%2Fmx.meicloud.com%2Fask%2Fuploads%2Farticle%2F20171108%2F159565ef5cc9fa01db677b6b24542de5.gif") center top no-repeat ;
			background-size: contain;
		}
		
		.mask {
		  background-color: #000;
		  opacity: 0.5;
		  position: fixed;
		  top: 0;
		  left: 0;
		  right: 0;
		  // width: 100%;
		  height: 100%;
		  z-index: 1
		}
		.pop { 
		  background-color: #052341;
		  position: fixed;
		  top: 88px;
		  left: 0;
		  right: 0;
		  bottom: 118px;
		  z-index: 2;
		  .close {
		  	position: absolute;
		  	top: 8px;
		  	right: 8px;
		  	font-size: 21px;

		  }
		  .close:hover {
		  	color: #409EFF;
		  }
		  .incol1-subtitle {
		  	display: block;
		  	height: 71px;
		  	line-height: 71px;
		  	text-align: center;
		  	font-size: 24px;
			background: #e5e5e5;
		  }
		  .incol1-subtitle1 {
			position: absolute;
			left: 66px;
			margin: 10px;
			color: white;
		  }
		  .incol1-subtitle2 {
		  	position: absolute;
		  	right: 41px;
		  	margin: 10px;
		  	color: white;
		  }
		  .incol1-dashboard22 {
		  	width: 100%;
		  	height: 300px;
		  	box-shadow: 0 0 6px rgba(59, 56, 56, 0.68);
		  }
		  .incol1-dashboard2{
		  	width: 300px;
		  	height: 300px;
		  	margin: 56px auto;
		  }
		  .incol1-curve22 {
		  	width: 100%;
		    height: 350px;
			box-shadow: 0 0 6px rgba(59, 56, 56, 0.68);
		  }
		  .incol1-curve2 {
		    width: 600px;
		    height: 350px;
		    margin: 56px auto;
		  }
		
		
		/*进入时的初始样式*/
		.fade-enter {
		  opacity: 0;
		  /*width: 100px;*/
		  height: 100px;
		}
		/*从进入开始到最终设置的样式之间经历的时间以及动画*/
		.fade-enter-active {
		  transition: all .4s ease;
		}
		/*从开始离开原始样式到离开之间经历的时间及动画*/
		.fade-leave-active {
		  transition: all .1s;	
		}
		/*离开时候的样式*/
		.fade-leave-to  {
		  opacity: 0;
		  /*width: 100px;*/
		  /*height: 800px;*/
		}
	}
	}
}	
</style>