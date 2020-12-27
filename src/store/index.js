import Vue from 'vue'
import Vuex from 'vuex'

//引入Vuex插件
Vue.use(Vuex)

const store = new Vuex.Store({
	//存放状态，共享属性
	state: {
		count: 1,
		value: false,
		value1: false,
		value2: false,
		value3: false,
		value4: false

	},
	mutations: {
		increment(state) {
			state.count ++
		},
		decrement(state) {
			state.count --
		},
		change(state) {
			state.value1 = !state.value
			state.value2 = !state.value
			state.value3 = !state.value
			state.value4 = !state.value
		}
	}
})

export default store