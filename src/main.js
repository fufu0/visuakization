import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import './assets/fonts/icomoon.css'

const app = createApp(App)
// 将 echarts 挂载到 Vue3 原型
import * as echarts from "echarts"
// 全局方法
app.config.globalProperties.$echart = echarts;

app.mount('#app')