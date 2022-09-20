<template>
  <div class="users panel">
          <div class="panel-inner">
            <h3>全国用户总量统计</h3>
            <div class="chart">
              <div class="bar"></div>
              <div class="data">
                <div class="item">
                  <h4>120,899</h4>
                  <span>
                    <i class="icon-dot" style="color: #ed3f35"></i>
                    用户总量
                  </span>
                </div>
                <div class="item">
                  <h4>248</h4>
                  <span>
                    <i class="icon-dot" style="color: #eacf19"></i>
                    本月新增
                  </span>
                </div>
              </div>
            </div>
          </div>
    </div>
</template>

<script>
    import {onMounted,getCurrentInstance,reactive,toRefs} from "vue"
    export default {
        name:"userPannel",
        setup(){
          // 配置单个bar的数据
          const item = {
            value: 1200,
            // 修改当前柱形的样式
            itemStyle: {
              color:"#245065"
            },
            // 鼠标放到柱子上取消高亮显示
            emphasis: {
               disabled:true
            },
            // 鼠标经过柱子不显示提示框
            tooltip:{
              extraCssText:'opacity:0'
            }
          }


          onMounted(() => { // 因为要使用dom节点，所以要在onmounted后使用
            const { proxy } = getCurrentInstance();
            // 1.实例化对象
            const myChart = proxy.$echart.init(document.querySelector(".bar"))
            // 2.指定配置
            const option = {
              color: new proxy.$echart.graphic.LinearGradient(
                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                0,
                0,
                0,
                1,
                [
                  { offset: 0, color: "#00fffb" }, // 0 起始颜色
                  { offset: 1, color: "#0061ce" } // 1 结束颜色
                ]
              ),
              tooltip: {
                trigger: 'item'
              },
              grid: {
                left: '0%',
                right: '3%',
                bottom: '3%',
                top:"3%",
                containLabel: true,
                // 是否显示直角坐标系网格
                show: true,
                //grid 四条边框的颜色
                borderColor: "rgba(0, 240, 255, 0.3)"

              },
              xAxis: [
                {
                  type: 'category',
                  data: [
                    "上海",
                    "广州",
                    "北京",
                    "深圳",
                    "合肥",
                    "",
                    "......",
                    "",
                    "杭州",
                    "厦门",
                    "济南",
                    "成都",
                    "重庆"
                  ],
                  axisTick: {
                    show:false,
                  },
                  // x轴线的颜色
                  axisLine:{
                    lineStyle: {
                      color:'rgba(0,240,255,0.3)'
                    }
                  },
                  // x轴文字的颜色
                   axisLabel:{
                     color:'#4c9bfd',
                    //  interval:0,
                     fontSize:10
                   }
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  axisTick: {
                    show:false
                  },
                  axisLabel:{
                    color:'#4c9bfd'
                  },
                  splitLine:{
                    lineStyle:{
                      color:'rgba(0,240,255,0.3)'
                    }
                  }
                }
              ],
              series: [
                {
                  name: '地域',
                  type: 'bar',
                  barWidth: '60%',
                  data: [
                    2100,
                    1900,
                    1700,
                    1560,
                    1400,
                    item,
                    item,
                    item,
                    900,
                    750,
                    600,
                    480,
                    240
                  ]
                }
              ]
            };
            // 3. 把配置给实例对象
            myChart.setOption(option)
            // 监听浏览器缩放，图表对象调用缩放resize函数
            window.addEventListener("resize",() => {
              myChart.resize()
            })
        })
        
        }
    }
</script>

<style scoped>
/* 用户统计模块 */
.users {
  height: 4.25rem;
  display: flex;
}
.users .chart {
  display: flex;
  margin-top: 0.3rem;
}
.users .bar {
  width: 7.35rem;
  height: 3rem;
}
.users .data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 2.1rem;
  padding: 0.45rem 0.375rem;
  box-sizing: border-box;
  background-image: url('../../assets/images/rect.png');
  background-size: cover;
}
.users h4 {
  margin-bottom: 0.15rem;
  font-size: 0.35rem;
  color: #fff;
}
.users span {
  display: block;
  color: #4c9bfd;
  font-size: 0.2rem;
}
</style>