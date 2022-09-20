<template>
  <div class="quarter panel">
        <div class="panel-inner">
            <h3>一季度销售进度</h3>
            <div class="chart">
                <div class="box">
                    <div class="gauge"></div>
                    <div class="label">50<small> %</small></div>
                </div>
                <div class="data">
                    <div class="item">
                        <h4>1,321</h4>
                        <span>
                            <i class="icon-dot" style="color: #6acca3"></i>
                            销售额(万元)
                        </span>
                    </div>
                    <div class="item">
                        <h4>150%</h4>
                        <span>
                            <i class="icon-dot" style="color: #ed3f35"></i>
                            同比增长
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
        name:"quarterPanel",
        setup(){
          onMounted(() => { // 因为要使用dom节点，所以要在onmounted后使用
            const { proxy } = getCurrentInstance();
            const myChart = proxy.$echart.init(document.querySelector(".gauge"))
            const option = {
              series: [
                {
                  name:"销售进度",
                  type: 'pie',
                  cursor:'auto',
                  radius: ['130%', '150%'],
                  center: ['48%','80%'],
                  labelLine: {
                    show: false
                  },
                  emphasis: {
                    disabled:true
                  },
                  // 饼状图的起始位置为180度,
                  startAngle:180,
                  data: [
                    { value: 100,
                      itemStyle: {
                      // 颜色渐变#00c9e0->#005fc1
                      color: new proxy.$echart.graphic.LinearGradient(
                        // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                        0,
                        0,
                        0,
                        1,
                        [
                          { offset: 0, color: "#00c9e0" }, // 0 起始颜色
                          { offset: 1, color: "#005fc1" } // 1 结束颜色
                        ]
                      )
                    }
                    },
                    { value: 100,
                      itemStyle: {
                        color: "#12274d"
                      }
                    },
                    { value: 200,
                      itemStyle: {
                        color:"transparent"
                      }
                    },
                  ]
                }
              ]
            };
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
.quarter {
  flex: 1;
  height: 2.9rem;
}
.quarter .inner {
  display: flex;
  flex-direction: column;
  margin: 0 -0.075rem;
}
.quarter .chart {
  flex: 1;
  padding-top: 0.225rem;
}
.quarter .box {
  position: relative;
}
.quarter .label {
  transform: translate(-50%, -30%);
  color: #fff;
  font-size: 0.375rem;
  position: absolute;
  left: 50%;
  top: 50%;
}
.quarter .label small {
  font-size: 50%;
}
.quarter .gauge {
  height: 1.05rem;
}
.quarter .data {
  display: flex;
  justify-content: space-between;
}
.quarter .item {
  width: 50%;
}
.quarter h4 {
  color: #fff;
  font-size: 0.3rem;
  margin-bottom: 0.125rem;
}
.quarter span {
  display: block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #4c9bfd;
  font-size: 0.175rem;
}
</style>