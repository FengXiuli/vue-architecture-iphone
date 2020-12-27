<template>
	<!-- 开关 -->
	<el-card class="incol1-card2" shadow="hover">
		<el-row>
			<el-col 
			:span="19" 
			class="incol1-card2-title">
				<span class="incol1-card2-switch">Switch</span>
			</el-col>
			<el-col 
			:span="5"
			>
				  <span 
				  @click="Incol1Card2Switch"
				  class="incol1-card2-span1"
				  >
				  	
				  <mt-switch v-model="$store.state.value"></mt-switch>
				  </span>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="6">
				<i class="el-icon-s-opportunity el-opportunity1" v-if="$store.state.value1" @click="in1cd2showModel1=true"></i>
				<i class="el-icon-s-opportunity el-opportunity11" v-else="$store.state.value1" @click="in1cd2showModel1=true"></i>
				<div class="mask" v-show="in1cd2showModel1" @click="in1cd2showModel1=false"></div>	
				<transition name="in1cd2fade">
  					<div class="pop" v-show="in1cd2showModel1">
  						<span class="incd2-title">Switch1Title</span>
  						<i class="el-icon-close close" @click="in1cd2showModel1=false"></i>
    					<el-row class="incd2-1">
							<el-col :span="6">
								<i class="el-icon-s-opportunity el-opportunity2" v-if="$store.state.value1"></i>
								<i class="el-icon-s-opportunity el-opportunity22" v-else="$store.state.value1"></i>
							</el-col>
							<el-col :span="13">
								<span class="incol1-card2-switch1 incol1-card2-switch">Switch1</span>
							</el-col>
							<el-col :span="5">
								  <mt-switch v-model="$store.state.value1"></mt-switch>
							</el-col>
						</el-row>
    					</div>
    				</div>
  				</transition>	
			</el-col>
			<el-col :span="13">
				<span class="incol1-card2-switch1 incol1-card2-switch">Switch1</span>
			</el-col>
			<el-col :span="5">
				  <mt-switch v-model="$store.state.value1"></mt-switch>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="6">
				<i class="el-icon-s-opportunity el-opportunity2" v-if="$store.state.value2" @click="in1cd2showModel2=true"></i>
				<i class="el-icon-s-opportunity el-opportunity22" v-else="$store.state.value2" @click="in1cd2showModel2=true"></i>
				<div class="mask" v-show="in1cd2showModel2" @click="in1cd2showModel2=false"></div>	
				<transition name="in1cd2fade">
  					<div class="pop" v-show="in1cd2showModel2">
  						<span class="incd2-title">Switch2Title</span>
  						<i class="el-icon-close close" @click="in1cd2showModel2=false"></i>
    					<el-row class="incd2-1">
							<el-col :span="6">
								<i class="el-icon-s-opportunity el-opportunity2" v-if="$store.state.value2"></i>
								<i class="el-icon-s-opportunity el-opportunity22" v-else="$store.state.value2"></i>
							</el-col>
							<el-col :span="13">
								<span class="incol1-card2-switch2 incol1-card2-switch">Switch2</span>
							</el-col>
							<el-col :span="5">
								  <mt-switch v-model="$store.state.value2"></mt-switch>
							</el-col>
						</el-row>
    					</div>
    				</div>
  				</transition>
			</el-col>
			<el-col :span="13">
				<span class="incol1-card2-switch2 incol1-card2-switch">Switch2</span>
			</el-col>
			<el-col :span="5">
				  <mt-switch v-model="$store.state.value2"></mt-switch>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="6">
				<i class="el-icon-s-opportunity el-opportunity3" v-if="$store.state.value3" @click="in1cd2showModel3=true"></i>
				<i class="el-icon-s-opportunity el-opportunity33" v-else="$store.state.value3" @click="in1cd2showModel3=true"></i>
				<div class="mask" v-show="in1cd2showModel3" @click="in1cd2showModel3=false"></div>	
				<transition name="in1cd2fade">
  					<div class="pop" v-show="in1cd2showModel3">
  						<span class="incd2-title">Switch3Title</span>
  						<i class="el-icon-close close" @click="in1cd2showModel3=false"></i>
    					<el-row class="incd2-1">
							<el-col :span="6">
								<i class="el-icon-s-opportunity el-opportunity2" v-if="$store.state.value3"></i>
								<i class="el-icon-s-opportunity el-opportunity22" v-else="$store.state.value3"></i>
							</el-col>
							<el-col :span="13">
								<span class="incol1-card2-switch3 incol1-card2-switch">Switch3</span>
							</el-col>
							<el-col :span="5">
								  <mt-switch v-model="$store.state.value3"></mt-switch>
							</el-col>
						</el-row>
    					</div>
    				</div>
  				</transition>
			</el-col>
			<el-col :span="13">
				<span class="incol1-card2-switch3 incol1-card2-switch">Switch3</span>
			</el-col>
			<el-col :span="5">
				  <mt-switch v-model="$store.state.value3"></mt-switch>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="6">
				<i class="el-icon-s-opportunity el-opportunity4" v-if="$store.state.value4" @click="in1cd2showModel4=true"></i>
				<i class="el-icon-s-opportunity el-opportunity44" v-else="$store.state.value4" @click="in1cd2showModel4=true"></i>
				<div class="mask" v-show="in1cd2showModel4" @click="in1cd2showModel4=false"></div>	
				<transition name="in1cd2fade">
  					<div class="pop" v-show="in1cd2showModel4">
  						<span class="incd2-title">Switch4Title</span>
  						<i class="el-icon-close close" @click="in1cd2showModel4=false"></i>
    					<el-row class="incd2-1">
							<el-col :span="6">
								<i class="el-icon-s-opportunity el-opportunity2" v-if="$store.state.value4"></i>
								<i class="el-icon-s-opportunity el-opportunity22" v-else="$store.state.value4"></i>
							</el-col>
							<el-col :span="13">
								<span class="incol1-card2-switch4 incol1-card2-switch">Switch4</span>
							</el-col>
							<el-col :span="5">
								  <mt-switch v-model="$store.state.value4"></mt-switch>
							</el-col>
						</el-row>
    					</div>
    				</div>
  				</transition>
			</el-col>
			<el-col :span="13">
				<span class="incol1-card2-switch4">Switch4</span>
			</el-col>
			<el-col :span="5">
				  <mt-switch v-model="$store.state.value4"></mt-switch>
			</el-col>
		</el-row>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				in1cd2showModel1: false,
				in1cd2showModel2: false,
				in1cd2showModel3: false,
				in1cd2showModel4: false,
			}
		},
		methods: {
			Incol1Card2Switch() {
				this.$store.commit('change')
			}
		}
	}
	
</script>

<style scoped lang="scss">

.incol1-card2 {
	cursor: pointer;
	width: 100%;
	border: 2px solid #ccc;
	box-shadow: 0 0 10px #ccc;
	margin-top: 10px;
	.el-col {
		margin-top: 20px;
	}
	.incol1-card2-title {
		padding-left: 10px;
		.incol1-card2-switch {
			font-size: 23px;
		}
		
	}
	.el-opportunity1 {
		color: rgba(251, 239, 13, 0.8);
	}
	.el-opportunity11 {
		color: rgba(13, 133, 231, 0.8);
	}
	.mask {
	  background-color: #000;
	  opacity: 0.5;
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  z-index: 1
	}
	.pop {
	  background-color: #FFF;
		  position: fixed;
		  top: 88px;
		  left: 0;
		  right: 0;
		  bottom: 118px;
		  z-index: 2;
	  .incd2-title {
	  	display: block;
	  	width: 100%;
	  	height: 60px;
	  	background: #ccc;
	  	text-align: center;
	  	line-height: 60px;
	  	font-size: 26px;
	  }
	  .close {
	  	position: absolute;
	  	top: 8px;
	  	right: 8px;
	  	font-size: 21px;
	  }
	  .close:hover {
		  	color: #409EFF;
	  }
	  .incd2-1 {
	  	margin: 20px;
	  	.incol1-card2-switch {
	  		font-size: 26px;
	  	}
	  }
	}
	.el-opportunity2 {
		color: rgba(251, 239, 13, 0.8);
	}
	.el-opportunity22 {
		color: rgba(13, 133, 231, 0.8);
	}
	.el-opportunity3 {
		color: rgba(251, 239, 13, 0.8);
	}
	.el-opportunity33 {
		color: rgba(13, 133, 231, 0.8);
	}
	.el-opportunity4 {
		color: rgba(251, 239, 13, 0.8);
	}
	.el-opportunity44 {
		color: rgba(13, 133, 231, 0.8);
	}

	.incol1-card2-switch1 {
			font-size: 15px;
	}
	.incol1-card2-switch2 {
			font-size: 15px;
	}
	.incol1-card2-switch3 {
			font-size: 15px;
	}
	.incol1-card2-switch4 {
			font-size: 15px;
	}
}

/*进入时的初始样式*/
	.in1cd2fade-enter {
	  opacity: 0;
	  // width: 100px;
	  height: 10px;
	}
	/*从进入开始到最终设置的样式之间经历的时间以及动画*/
	.in1cd2fade-enter-active {
	  transition: all .6s ease;
	}
	/*从开始离开原始样式到离开之间经历的时间及动画*/
	.in1cd2fade-leave-active {
	  transition: all .1s;	
	}
	/*离开时候的样式*/
	.in1cd2fade-leave-to  {
	  opacity: 0;
	  /*width: 100px;*/
	  /*height: 800px;*/
	}	
</style>