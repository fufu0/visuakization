<template>
    <!-- 销售额 -->
    <div class="sales panel">
        <div class="panel-inner" @mouseover="clearTimer" @mouseout="setTimer">
          <div class="caption">
              <h3>销售额统计</h3>
              <a 
                href="javascript:;" 
                v-for="(item,i) in tab"
                :class="{active: activeIndex === i}"
                @click="changeIndex(i);echartChange(item.alias,i);changIndex(i)"
                :key="i"
              >
              {{item.name}}
              </a>
          </div>
          <div class="chart">
              <div class="label">单位:万</div>
              <div class="line"></div>
          </div>
        </div>
    </div>
</template>

<script>
    import classChange from "../../hooks/classChange"
    import {onMounted,getCurrentInstance,reactive,toRefs} from "vue"
    import autoChange from '../../hooks/autoChange'
    export default {
        name: "orderPannel",
        setup(){
              let option,myChart
              onMounted(() => { // 因为要使用dom节点，所以要在onmounted后使用
                const { proxy } = getCurrentInstance();
                // 1.实例化对象
                myChart = proxy.$echart.init(document.querySelector(".line"))
                // 2.指定配置
                option = {
                    color: ['#00f2f1','#ed3f35'],
                    tooltip: {
                      trigger: 'axis'
                    },
                    legend: {
                      // 如果 series 里面设置了 name，此时图例组件的data可以省略
                      // data: ['Email', 'Union Ads'],
                      // 距离右边10%
                      right:'10%',
                      // 图例文字颜色
                      textStyle: {
                        color:"#4c9bfd"
                      }
                    },
                    grid: {
                      top:'20%',
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      show: true,
                      borderColor:"#012f4a",
                      containLabel: true
                    },
                    xAxis: {
                      type: 'category',
                      boundaryGap: false,
                            data: [
                              "1月",
                              "2月",
                              "3月",
                              "4月",
                              "5月",
                              "6月",
                              "7月",
                              "8月",
                              "9月",
                              "10月",
                              "11月",
                              "12月"
                            ],
                      // 去除刻度
                      axisTick: {
                        show: false
                      },
                      // 修饰刻度标签的颜色
                      axisLabel: {
                        color:"#4c9bfd"
                      },
                      // 去除x坐标轴的颜色
                      axisLine: {
                        show: false
                      }
                    },
                    yAxis: {
                      type: 'value',
                      // 去除刻度
                      axisTick: {
                        show: false
                      },
                      // 修饰刻度标签的颜色
                      axisLabel: {
                        color:"#4c9bfd"
                      },
                      // 修改y轴分割线的颜色
                      splitLine: {
                        lineStyle: {
                          color: "#012f4a"
                        }
                      }
                    },
                    series: [
                      {
                        name: '预期销售额',
                        type: 'line',
                        stack: 'Total',
                        data: data.year[0],
                        smooth: true 
                      },
                      {
                        name: '实际销售额',
                        type: 'line',
                        stack: 'Total',
                        data: data.year[1],
                        smooth: true 
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

              // tab栏切换相关
              const tab = [
                {name:"年",alias:"year"},
                {name:"季",alias:"quarter"},
                {name:"月",alias:"month"},
                {name:"日",alias:"week"},
              ]
              const classToChange = classChange()
              // 切换tab栏数据相关
              let data = {
                year: [
                  [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                  [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
                ],
                quarter: [
                  [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
                  [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
                ],
                month: [
                  [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
                  [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
                ],
                week: [
                  [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
                  [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
                ]
              };
              
              function echartChange(alias,i) {
                  option.series[0].data = data[alias][0]
                  option.series[1].data = data[alias][1]
                  myChart.setOption(option)
              }
              // 自动切换
              function autoSelf(index) {
                const alias = tab[index].alias
                echartChange(alias)
                classToChange.changeIndex(index)
              }

              const autoRes = autoChange({
                todo: autoSelf,
                timeItv: 3000,
                length:Object.keys(data).length
              })

              return {
                tab,
                ...classToChange,
                echartChange,
                ...autoRes
              }
        }
    }
</script>

<style scoped>
/* 销售模块制作 */
.sales {
  height: 3.1rem;
}
.sales .caption {
  display: flex;
  line-height: 1;
}
.sales h3 {
  height: 0.225rem;
  padding-right: 0.225rem;
  border-right: 0.025rem solid #00f2f1;
}
.sales a {
  padding: 0.05rem;
  font-size: 0.2rem;
  margin: -0.0375rem 0 0 0.2625rem;
  border-radius: 0.0375rem;
  color: #0bace6;
}
.sales a.active {
  background-color: #4c9bfd;
  color: #fff;
}
.sales .panel-inner {
  display: flex;
  flex-direction: column;
}
.sales .chart {
  flex: 1;
  padding-top: 0.1875rem;
  position: relative;
}
.sales .label {
  position: absolute;
  left: 0.525rem;
  top: 0.225rem;
  color: #4996f5;
  font-size: 0.175rem;
}
.sales .line {
  width: 100%;
  height: 100%;
  /* background-color: pink; */
}
</style>