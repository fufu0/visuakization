<template>
  <div class="point panel">
          <div class="panel-inner">
            <h3>点位分布统计</h3>
            <div class="chart">
              <div class="pie"></div>
              <div class="data">
                <div class="item">
                  <h4>320,11</h4>
                  <span>
                    <i class="icon-dot" style="color: #ed3f35"></i>
                    点位总数
                  </span>
                </div>
                <div class="item">
                  <h4>418</h4>
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
    name:"point-pannel",
    setup() {
        onMounted(() => { // 因为要使用dom节点，所以要在onmounted后使用
            const { proxy } = getCurrentInstance();
            const myChart = proxy.$echart.init(document.querySelector(".pie"))
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                    backgroundColor:'rgba(0,0,0,0.7)',
                    borderColor:"rgba(0,0,0,0.7)",
                    textStyle:{
                       color:'#fff'
                    }
                },
                // 注意颜色写的位置
                color: [
                  "#006cff",
                  "#60cda0",
                  "#ed8884",
                  "#ff9f7f",
                  "#0096ff",
                  "#9fe6b8",
                  "#32c5e9",
                  "#1d9dff"
                ],
                series: [
                    {
                    name: '地域',
                    type: 'pie',
                    radius: ["10%", "70%"],
                    center: ['50%', '50%'],
                    roseType: 'radius',
                    itemStyle: {
                        borderRadius: 5
                    },
                    data: [
                      { value: 20, name: "云南" },
                      { value: 26, name: "北京" },
                      { value: 24, name: "山东" },
                      { value: 25, name: "河北" },
                      { value: 20, name: "江苏" },
                      { value: 25, name: "浙江" },
                      { value: 30, name: "四川" },
                      { value: 42, name: "湖北" }
                    ],
                    // 修饰饼形图文字相关的样式 label对象
                    label: {
                      fontSize: 10,
                      color: 'inherit'
                    },
                    // 修饰引导线样式
                    labelLine: {
                      // 连接到图形的线长度
                      length: 6,
                      // 连接到文字的线长度
                      length2: 8
                    }
                  }
                ]
            };
            myChart.setOption(option)
            // 监听浏览器缩放，图表对象调用缩放resize函数
            window.addEventListener("resize",() => {
              myChart.resize()
            })

        })
        return {

        }
    }
}
</script>

<style scoped>
    /* 点位分布统计模块制作 */
    .point {
    height: 4.25rem;
    }
    .point .chart {
    display: flex;
    margin-top: 0.3rem;
    justify-content: space-between;
    }
    .point .pie {
    width: 3.9rem;
    height: 3rem;
    margin-left: -0.125rem;
    }
    .point .data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 2.1rem;
    padding: 0.45rem 0.375rem;
    box-sizing: border-box;
    background-image: url('../../assets/images/rect.png');
    background-size: cover;
    }
    .point h4 {
    margin-bottom: 0.15rem;
    font-size: 0.35rem;
    color: #fff;
    }
    .point span {
    display: block;
    color: #4c9bfd;
    font-size: 0.2rem;
    }
</style>