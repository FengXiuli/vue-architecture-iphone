<template>
	<div class="r-title">
		<router-link to="/sensar/" class="r-left">楼宇</router-link>
    <!-- 标题 -->
		<span class="r-center">机器人后台管理系统</span>
		<span>
			<i class="el-icon-more r-right" @click="showModel4=true"></i>
			<div class="mask" v-show="showModel4" @click="showModel4=false"></div>	
			<transition name="fade">
  				<div class="pop" v-show="showModel4">
  					<i class="el-icon-close close" @click="showModel4=false"></i>
    				<span class="incol1-subtitle">Temperature</span>
    				<div class="setting">
          <div class="setting-setting">   
          <div style="color: #87CEFA" class="clearfix">
            <span class="st">设置</span>
          </div>
          <div class="text item">
            <div>
              <span>温度上限</span>
               &nbsp 
               <el-input 
               v-model="highTemperature" 
               placeholder="请输入值" 
               style="width: 45%"
               class="input"
               >
               </el-input>
               &nbsp
               <span>度</span>
            </div> 
            <div>
              <span>温度下限</span>
               &nbsp 
               <el-input 
               v-model="lowTemperature" 
               placeholder="请输入值" 
               style="width: 45%">
               </el-input>
               &nbsp
               <span>度</span>
            </div> 
            <div>
              <span>CO2上限</span>
               &nbsp 
               <el-input 
               v-model="highCO2" 
               placeholder="请输入值" 
               style="width: 45%">
               </el-input>
               &nbsp
               <span>度</span>
            </div> 
            <div>
              <span>CO2下限</span>
               &nbsp 
               <el-input 
               v-model="lowCO2" 
               placeholder="请输入值" 
               style="width: 45%">
               </el-input>
               &nbsp
               <span>度</span>
            </div> 
            <div>
              <span>湿度上限</span>
               &nbsp 
               <el-input 
               v-model="highHumidity" 
               placeholder="请输入值" 
               style="width: 45%">
               </el-input>
               &nbsp
               <span>度</span>
            </div> 
            <div>
              <span>湿度下限</span>
               &nbsp 
               <el-input 
               v-model="lowHumidity" 
               placeholder="请输入值" 
               style="width: 45%">
               </el-input>
               &nbsp
               <span>度</span>
            </div> 
            <span @click="confirm" class="confirm" size="medium">确认</span>
          </div>
        </div>
        	<div class="sampling">
              		<el-button type="primary" round class="begin" @click="begin">开始</el-button>               	
              		<el-button type="primary" round class="end" @click="ennd">停止</el-button>               
            </div>
       </div>	
    			</div>
  			</transition>
		</span>
	</div>	
</template>

<script src="http://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js"></script>
<script>
  // 导入ROS库
	import EventEmitter2 from '@/lib/eventemitter2.min.js'
	import RosLib from '@/lib/roslib.min.js'
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
		  showModel4: '',
		  highTemperature: '',
          lowTemperature: '',
          highHumidity: '',
          lowHumidity: '',
          highCO2: '',
          lowCO2: '0',
          height: 400,
		}
	},
	methods: { 
      // 开始采样
      begin() {   
          // publish开始采样
        var cmdVel = new ROSLIB.Topic({
          ros : ros,
          name : this.pubarr[0],
          messageType : 'std_msgs/String'
        });

        var twist = new ROSLIB.Message({
          data:'1'
          });
        cmdVel.publish(twist);
      },

      // 停止采样
      ennd() {
           // //publish停止采样
        var cmdVel = new ROSLIB.Topic({
          ros : ros,
          name : this.pubarr[0],
          messageType : 'std_msgs/String'
        });

        var twist = new ROSLIB.Message({
          data:'0'
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
      },
      confirm() {
        if(parseInt(this.highTemperature) > 90 || parseInt(this.lowTemperature) < -20) {
          alert('温度超出范围,温度的范围为-20~90℃')
        }
         if(parseInt(this.highHumidity) > 90 || parseInt(this.lowHumidity) < -20) {
         alert('湿度超出范围')
        }
        if(parseInt(this.highCO2) > 800 || parseInt(this.lowCO2) < -20) {
          alert('CO2浓度超出范围')
        }
        if(parseInt(this.highTemperature) == '' || parseInt(this.lowTemperature) == '' || parseInt(this.highHumidity) == '' || parseInt(this.lowHumidity) == '' || parseInt(this.highCO2) == '' || parseInt(this.lowCO2) == '') {
          this.$message({
          message: '输入内容不能为空',
          type: 'warning'
          })
        }
        if(parseInt(this.highTemperature) <= 90 && parseInt(this.lowTemperature) >= -20 && parseInt(this.highCO2) <= 800 && parseInt(this.lowCO2) >= -20 && parseInt(this.highHumidity) <= 90 && parseInt(this.lowHumidity) >= -20) {
          this.$confirm('此操作将会被保存, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
        const str = '[' + '[' + parseInt(this.highTemperature) + ',' + parseInt(this.lowTemperature) + ']' + ',' + '[' + parseInt(this.highCO2) + ',' + parseInt(this.lowCO2) + ']' + ',' + '[' +parseInt(this.highHumidity) + ',' + parseInt(this.lowHumidity) + ']' + ']'
        console.log(str)
        // publish传感器参数上下限报警值
        var cmdVel = new ROSLIB.Topic({
          ros : ros,
          name : this.pubarr[2],
          messageType : 'std_msgs/String'
        });

        var twist = new ROSLIB.Message({
          data:str
          });
        cmdVel.publish(twist);

        } 

      }
    } 
}	
</script>

<style  lang="scss">
.r-title {
	width: 100%;
	height: 115px;
	margin: 20px auto;
	line-height: 100px;
  	box-shadow: 0 0 6px rgba(59, 56, 56, 0.68);
  	font-size: 30px;
  	display: flex;
  	justify-content: space-between;
  	.r-left {
  		margin-left: 20px;
  		text-decoration: none;
  		color: #389638;
  	}
  	.r-center {
  		margin: 0 auto;
  	}
  	.r-right {
  		color: #26a2ff;
  		margin-right: 20px;
  		margin-top: 35px;
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
	  
	}	
	/* 设置 */
	.setting {
		margin-left: 0px;
		margin-right: 0px;
		.el-input__inner {
    		background-color: rgba(100,100,100,0.2);
    		// box-shadow: 40px 40px 40px 40px #F1F1F1 inset;
    		border: 1px solid #2c58a6;
    		opacity: 1;
   		}
		.setting-setting {
			.st {
				margin-left: 10px;
			}
			// border: 1px solid #2c58a6;
			// box-shadow: 0 0 10px #2c58a6;
			// height: 40px;
			.clearfix {
				height: 80px;
			}
			.text {

			  font-size: 26px;
			  color: #87CEFA;
			  text-align:center;
			  div {
			  	height: 68px;
			  }
			  .confirm {
			  	position: absolute;
			  	right: 12%;
			  }
			}
		}
		.sampling {
			border: 1px solid #2c58a6;
			box-shadow: 0 0 10px #2c58a6;
			position: relative;
			margin-top: 98px;
			height: 100px;
			.begin {
				position: absolute;
				top: 26px;
				left: 20%;
			}
			.end {
				position: absolute;
				top: 26px;
				right: 20%;
			}
		}
		
	}
}
</style>