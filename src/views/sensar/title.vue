<template>
	<div class="r-title">
		<router-link to="/electricMeter/" class="r-left">智慧电表</router-link>
		<span class="r-center">智慧楼宇</span>
	</div>	
</template>

<script src="http://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js"></script>
<script>
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

		}
	},
	methods: { 
     
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
      font-size: 25px;
  	}
  	.r-center {
  		margin-left: 150px;
  	}
  	.r-right {
  		color: #26a2ff;
  		margin-right: 20px;
  		margin-top: 35px;
  	}
}
</style>