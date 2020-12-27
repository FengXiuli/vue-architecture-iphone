<template>
  <!-- 空调 -->
	<el-card class="incol2-card1" shadow="hover">
		<el-progress v-if="A" type="dashboard" :percentage="percentage" :color="color1"  :format="format" :width="180"></el-progress>
  		<el-progress v-if="B" type="dashboard" :percentage="percentage" :color="color2" :width='180' :format="format"></el-progress>
  		<el-progress v-if="C" type="dashboard" :percentage="percentage" :color="color3" :width='180' :format="format"></el-progress>
  		<el-progress v-if="D" type="dashboard" :percentage="percentage" :color="color4" :width='180' :format="format"></el-progress>
      <div class="indicate">
        <span>{{ model }}</span><span>-离家</span>
      </div>
  		<div class="incol2-icon">
  			<i class="el-icon-discount incol2-icon1"  v-if="AA" @click="clickA"></i>
  			<i class="el-icon-discount incol2-icon11" v-if="A"></i>
  			<i class="el-icon-sunny incol2-icon2" v-if="BB" @click="clickB"></i>
  			<i class="el-icon-sunny incol2-icon22" v-if="B"></i>
  			<i class="el-icon-light-rain incol2-icon3" v-if="CC" @click="clickC"></i>
  			<i class="el-icon-light-rain incol2-icon33" v-if="C"></i>
  			<i class="el-icon-video-play incol2-icon4" @click="clickD"></i>
  		</div>
  		<el-button-group>
  		  <el-button size="large" class="incol2-card1-button incol2-card1-button1" icon="el-icon-minus" @click="decrease"></el-button>
  		  <el-button  class="incol2-card1-button incol2-card1-button2" icon="el-icon-plus" @click="increase"></el-button>
  		</el-button-group>	
	</el-card>

</template>

<script>
export default {
	data() {
		 return {
		 	    A: false,
		 	    B: false,
		 	    C: false,
		 	    D: true,
		 	    AA: true,
          BB: true,
          CC: true,
        	percentage: 23,
        	color1: 'green',
        	color2: '#ff8100',
        	color3: '#2b9af9',
        	color4: '#ccc',
          model:'关'
      	}
	},
	methods: {
		format(percentage) {
			return `${percentage}℃`
		},
		increase() {
        	this.percentage += 1;
        	if (this.percentage > 100) {
        	  this.percentage = 100;
        	}
      	},
        decrease() {
          this.percentage -= 1;
          if (this.percentage < 0) {
            this.percentage = 0;
          }
        },
        clickA() {
        	this.A = true
        	this.B = false
        	this.C = false
        	this.D = false
        	this.AA = false
          this.BB = true
          this.CC = true
          this.model = "自动"
        },
        clickB() {
        	this.A = false
        	this.B = true
        	this.C = false
        	this.D = false
          this.BB = false
          this.AA = true
          this.CC = true
          this.model = "制热"
        },
        clickC() {
        	this.A = false
        	this.B = false
        	this.C = true
        	this.D = false
          this.CC = false
          this.BB = true
          this.AA = true
          this.model = "制冷"
        },
        clickD() {
        	this.A = false
        	this.B = false
        	this.C = false
        	this.D = true
          this.BB = true
          this.CC = true
          this.AA = true
          this.model = "关"
        },
	}
}
</script>

<style scoped lang="scss">
.incol2-card1 {
	width: 100%;
  height: 410px;
	border: 2px solid #ccc;
	box-shadow: 0 0 10px #ccc;
	text-align: center;
	position: relative;
  margin-top: 15px;
  margin-bottom: 300px;
  .el-progress {
    margin: 0 auto;
  }
  .indicate {
    position: absolute;
    left: 44%;
    top: 60%;
  }
	.incol2-icon {
		position: absolute;
		left: 38%;
		top: 68%;
		i {
			margin-left: 13px;
      font-size: 20px;
      cursor: pointer;
		}
		.incol2-icon11 {
			color: green;
		}
		.incol2-icon22 {
			color: #ff8100;
		}
		.incol2-icon33 {
			color: #2b9af9;
		}
		.incol2-icon44 {
			color: #ccc;
		}
	}
  .incol2-card1-button1 {
    top: 85%;
    position: absolute;
    width: 56px;
    height: 40px;
    left: 36%;
  }
  .incol2-card1-button2 {
    top: 85%;
    position: absolute;
    width: 56px;
    height: 40px;
    left: 56%;
  }

}

</style>