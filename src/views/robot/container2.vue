<template>
	<ul class="r-container1">
    <!-- 湿度 -->
		<li class="li1">	
			<span class="indicate"><i class="el-icon-open"></i> Humidity</span>
			<p class="num">20.9</p>
			<div class="incol1-picture" @click="showModel=true"></div>	
			<div class="mask" v-show="showModel" @click="showModel=false"></div>	
			<transition name="fade">
  				<div class="pop" v-show="showModel">
  					<i class="el-icon-close close" @click="showModel=false"></i>
    				<span class="incol1-subtitle">Humidity</span>
    				<span class="incol1-subtitle1">Humidity</span>
    				<span class="incol1-subtitle2">20.9</span>
    				<div class="incol1-dashboard11">
    					<div class="incol1-dashboard1" ref="myechartHumidity"></div>
    				</div>
    				<div class="incol1-curve11">
    					<div class="incol1-curve1" ref="mychartHumidity">
    				</div>
    				</div>
    			</div>
  			</transition>	
		</li>
    <!-- 摄像头 -->
		<li class="li2">
      <span class="indicate"><i class="el-icon-open"></i> Video Surveillance</span>
			<div class="incol1-picture" @click="showModel3=true"></div>	
			<div class="mask" v-show="showModel3" @click="showModel3=false"></div>	
			<transition name="fad">
  				<div class="pop" v-show="showModel3">
  					<i class="el-icon-close close" @click="showModel3=false"></i>
            <span class="incol1-subtitle">Video Surveillance</span>
    				<div class="picture">
              <img src="../../assets/robot_images/picture1.png" class="picture1 alt="">
              <img src="../../assets/robot_images/picture2.png"  class="picture2 alt="">
             </div>
             <div class="robot-po">
                <span class="direction">摄像头方向调控</span>
                <div id="lefdt" ref="left">
                  <div class="nipple_l">
                    <div class="front_l"></div>
                    <div class="back_l"></div>
                  </div>
                </div>
              </div>
              <div class="robot-walking">
                <span class="walking-direction" >机器人行走控制</span>
                <div id="left" @click="stop">
                  <div class="nipple_l1">
                    <div class="front_l1"></div>
                    <div class="back_l1"></div>
                  </div>
                </div>
              </div>
              <el-row class="say">
              <el-col :span="14">
              <el-input
              placeholder="请输入内容"
              v-model="input"
              style="width: 100%"
              clearable>
              </el-input>  
                </el-col> 
                <el-col :span="8">
                  <el-button type="primary" round @click="say" class="subsay">say</el-button>
                </el-col> 
            </el-row>
    			</div>
  			</transition>
		</li>
	</ul>
</template>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js"></script>
<script>
  // 导入ROS库
  import EventEmitter2 from '@/lib/eventemitter2.min.js'
  import RosLib from '@/lib/roslib.min.js'
  // 导入虚拟摇杆库
  import nipplejs from 'nipplejs'
  // 导入echarts
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
        showModel3: false,
				pubarr:['/voice/switch', '/voice/say', '/set/params', '/sensor/data'],
				height: 400,
        input: '',
			}
	  },
	  mounted: function(){     
      this.dashboardHumidity(),
      this.curveHumidity(),
      this.direction(),
      this.direction2() 
    },
    created() {
      this.direction(),
      this.direction2() 
    },
    methods: {
       // 湿度仪表盘
    	dashboardHumidity() {
      var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%RH"
            },
            series: [
                {
                    name: '湿度',
                    radius: '86%',
                    center: ['50%', '50%'],
                    min: 0,
                    max: 200,
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
                            fontWeight: 'normal',// 字体粗细
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
                    data: [{value: 0, name: '湿度'}]
                }
            ]
        };
         //初始化一个echarts
       let myechartHumidity = this.$echarts.init(this.$refs.myechartHumidity)
          myechartHumidity.setOption(option,true);
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
          option.series[0].data[0].value = array[3];
            myechartHumidity.setOption(option,true);
        });
      },

      // 湿度曲线图
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

            
             mychartHumidity.setOption(option);
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
       
      },

       // 控制摄像头移动方向
       direction() {
        var distance = 0;
        var angle = null;
        var time = null;
        var manager = nipplejs.create({
            zone: document.getElementById('lefdt'),
            mode: 'dynamic',
            // position: {left: '50%', top: '50%'},
            color: '#1E90FF',
            size: '40'
        });
        manager
        .on('start', function (evt, data) {
          time = setInterval(() => {
            onStart && onStart(distance,angle);
          }, 100);
        })
        .on('move', function (evt, data) {
          if (data.direction) {
            angle = data.direction.angle;
            distance = [data.distance,data.angle.degree];
          }
        })
        .on('end', function (evt, data) {
          clearInterval(time);
        });

        function onStart(distance, angle) { 
          switch(angle) {
            case 'up':
              console.log('摄像头 => 向' + angle + '转动  ' + distance[0] + '个单位  ' + distance[1] + '角度');
              //publish 上
                    var cmdVel = new ROSLIB.Topic({
                    ros : ros,
                    name : 'round_control',
                    messageType : 'std_msgs/String'
                    });
  
                    var twist = new ROSLIB.Message({
                    data:'ABBRobot::PT::[' + distance[0] + ',' + distance[1] + '];' 
                    });
                    cmdVel.publish(twist);
              break;
            case 'right':
              console.log('摄像头 => 向' + angle + '转动  ' + distance[0] + '个单位  ' + distance[1] + '角度');
              //publish 上
                    var cmdVel = new ROSLIB.Topic({
                    ros : ros,
                    name : 'round_control',
                    messageType : 'std_msgs/String'
                    });
  
                    var twist = new ROSLIB.Message({
                    data:'ABBRobot::PT::[' + distance[0] + ',' + distance[1] + '];' 
                    });
                    cmdVel.publish(twist);
              break;
            case 'left':
              console.log('摄像头 => 向' + angle + '转动  ' + distance[0] + '个单位  ' + distance[1] + '角度');
              //publish 上
                    var cmdVel = new ROSLIB.Topic({
                    ros : ros,
                    name : 'round_control',
                    messageType : 'std_msgs/String'
                    });
  
                    var twist = new ROSLIB.Message({
                    data:'ABBRobot::PT::[' + distance[0] + ',' + distance[1] + '];' 
                    });
                    cmdVel.publish(twist);
              break;
            case 'down':
              console.log('摄像头 => 向' + angle + '转动  ' + distance[0] + '个单位  ' + distance[1] + '角度');
              //publish 上
                    var cmdVel = new ROSLIB.Topic({
                    ros : ros,
                    name : 'round_control',
                    messageType : 'std_msgs/String'
                    });
  
                    var twist = new ROSLIB.Message({
                    data:'ABBRobot::PT::[' + distance[0] + ',' + distance[1] + '];' 
                    });
                    cmdVel.publish(twist);
              break;
          }
        } 
      },
       // 控制摄像头移动方向
       direction2() {
         var distance = 0;
         var angle = null;
         var time = null;
         var manager = nipplejs.create({
            zone: document.getElementById('left'),
            mode: 'dynamic',
            // position: {left: '50%', top: '50%'},
            color: '#9b30FF',
            size: '40'
         });
         manager
         .on('start', function (evt, data) {
           time = setInterval(() => {
             onStart && onStart(distance,angle);
           }, 500);
         })
         .on('move', function (evt, data) {
           if (data.direction) {
             angle = data.direction.angle;
             distance = [data.distance,data.angle.degree];
            }
          })
         .on('end', function (evt, data) {
           clearInterval(time);
         });
         function onStart(distance, angle) { 
           switch(angle) {
              case 'up':
                  //publish 上
                      var cmdVel = new ROSLIB.Topic({
                      ros : ros,
                      name : 'turtlebot3_teleop_round',
                      messageType : 'std_msgs/String'
                      });
          
                      var twist = new ROSLIB.Message({
                      data:distance[0] + '::' + distance[1] + ';'
                      });
                      cmdVel.publish(twist);
                console.log('机器人 => 向' + angle + '移动  ' + distance[0] + '个单位  ' + distance[1] + '角度');
                
                break;
              case 'right':
                   //publish 右
                      var cmdVel = new ROSLIB.Topic({
                      ros : ros,
                      name : 'turtlebot3_teleop_round',
                      messageType : 'std_msgs/String'
                      });
          
                      var twist = new ROSLIB.Message({
                      data: distance[0] + '::' + distance[1] + ';'
                      });
                      cmdVel.publish(twist);
                console.log('机器人 => 向' + angle + '移动  ' + distance[0] + '个单位  ' + distance[1] + '角度');
                break;
              case 'left':
                //publish 左
                      var cmdVel = new ROSLIB.Topic({
                      ros : ros,
                      name : 'turtlebot3_teleop_round',
                      messageType : 'std_msgs/String'
                      });
          
                      var twist = new ROSLIB.Message({
                      data: distance[0] + '::' + distance[1] + ';'
                      });
                      cmdVel.publish(twist);
                console.log('机器人 => 向' + angle + '移动  ' + distance[0] + '个单位  ' + distance[1] + '角度');
                break;
              case 'down':
                //publish 下
                      var cmdVel = new ROSLIB.Topic({
                      ros : ros,
                      name : 'turtlebot3_teleop_round',
                      messageType : 'std_msgs/String'
                      });
          
                      var twist = new ROSLIB.Message({
                      data: distance[0] + '::' + distance[1] + ';'
                      });
                      cmdVel.publish(twist);
                console.log('机器人 => 向' + angle + '移动  ' + distance[0] + '个单位  ' + distance[1] + '角度');
              break;
            }
           }        
          },

          // 虚拟动感摇杆停止指令
          stop() {
              console.log('0,0')
              var cmdVel = new ROSLIB.Topic({
              ros : ros,
              name : 'turtlebot3_teleop_round',
              messageType : 'std_msgs/String'
              });
  
              var twist = new ROSLIB.Message({
              data:'0' + '::' + '0' + ';'
              });
              cmdVel.publish(twist);
         },
         
         // 语音播报
         say() {
          //publish语音播报
           var cmdVel = new ROSLIB.Topic({
             ros : ros,
             name : this.pubarr[1],
             messageType : 'std_msgs/String'
           });
   
           var twist = new ROSLIB.Message({
             data:this.input
             });
           cmdVel.publish(twist);
         }  
    }
  }	
</script>

<style  lang="scss">
.r-container1 {
	margin-top: 240px;
  position: relative;
	li {
		list-style: none;
    position: absolute;
		width: 48.5%;
		height: 200px;
		background: #fff;
    box-shadow: 0 0 6px rgba(59, 56, 56, 0.68);
    font-size: 20px;
	}
	.li1 {
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
		    // box-shadow: 0 0 6px rgba(59, 56, 56, 0.68);
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
	.li2 {
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
			height: 150px;
			background: url("../../assets/robot_images/camera.gif") center center no-repeat;
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
		  .picture {
        width: 630px;
        height: 185px;
        padding: 10px;
        position: relative;
        border: 1px solid #2c58a6;
        box-shadow: 0 0 10px #2c58a6;
        .picture1 {
          position: absolute;
          top: 0;
          left: 0;
          width: 310px;
          height: 195px;
        }
        .picture2 {
          position: absolute;
          top: 4px;
          right: -6px;
          width: 320px;
          height: 188px;
        }
     }
      // 虚拟摇杆
    .robot-po {
      margin-top: 15px;
      margin-left: 6px;
      width: 305px;
      height: 180px;
      border: 1px solid #2c58a6;
      box-shadow: 0 0 10px #2c58a6;
    } 
    .direction {
      display: block;
      width: 100%;
      height: 40px;
      color: #409EFF;
      font-size: 18px;
      line-height: 40px;
      text-align: center;
    }

   #lefdt {
     position: relative;
     width: 100%;
     height: 180px;
   }
   // 虚拟摇杆
   .robot-walking {
     position: absolute;
     top: 270px;
     right: 0;
     margin-right: 6px;
     width: 320px;
     height: 180px;
     border: 1px solid #2c58a6;
     box-shadow: 0 0 10px #2c58a6;
    .walking-direction {
     display: block;
     width: 100%;
     height: 40px;
     color: #409EFF;
     font-size: 18px;
     line-height: 40px;
     text-align: center;
   }
   #left {
      position: relative;
      width: 100%;
      height: 180px;
    }
   } 
    .el-input__inner {
        background-color: rgba(100,100,100,0.2);
        // box-shadow: 40px 40px 40px 40px #F1F1F1 inset;
        border: 1px solid #2c58a6;
        opacity: 1;
      }
  .say {
    padding: 10px;
    margin-top: 8px;
  }
  .subsay {
    margin-left: 16px;
  }
  
		/*进入时的初始样式*/
		.fad-enter {
		  opacity: 0;
		  /*width: 100px;*/
		  height: 100px;
		}
		/*从进入开始到最终设置的样式之间经历的时间以及动画*/
		.fad-enter-active {
		  transition: all .4s ease;
		}
		/*从开始离开原始样式到离开之间经历的时间及动画*/
		.fad-leave-active {
		  transition: all .1s;	
		}
		/*离开时候的样式*/
		.fad-leave-to  {
		  opacity: 0;
		  /*width: 100px;*/
		  /*height: 800px;*/
		}
	}
	}
}	
</style>