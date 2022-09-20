<template>
    <div class="channel panel">
        <div class="panel-inner">
            <h3>渠道分布</h3>
            <div class="data">
                <div class="radar"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {onMounted,getCurrentInstance,reactive,toRefs} from "vue"
    export default {
        name:"channePanel",
        setup(){
            onMounted(() => { // 因为要使用dom节点，所以要在onmounted后使用
            const { proxy } = getCurrentInstance();
            // 1.实例化对象
            const myChart = proxy.$echart.init(document.querySelector(".radar"))
            // 2.指定配置
            const dataBJ = [
                
            ];
            const lineStyle = {
                width: 1,
                opacity: 0.5,
                color:'#fff'
            };
            const option = {
                tooltip: {
                    show: true,
                    // 控制提示框组件的显示位置
                    position: ['50%','10%'],
                    textStyle:{
                        fontSize:"10",
                        color:'#fff'
                    },
                    backgroundColor:'rgba(0,0,0,0.7)',
                    borderColor:"rgba(0,0,0,0.7)",
                    formatter: (params) => {
                        let str = ""
                        for(let i = 0; i < params.value.length; i++) {
                            str += `<div style="margin-bottom:2px">${option.radar.indicator[i].name}  ${params.value[i]}</div>`
                        }
                        // console.log(str);
                        return `<div style="margin-bottom:4px">${params.seriesName}</div>${str}`
                    }
                },
                radar: {
                    radius:"60%", 
                    indicator: [
                        { name: "机场", max: 100 },
                        { name: "商场", max: 100 },
                        { name: "火车站", max: 100 },
                        { name: "汽车站", max: 100 },
                        { name: "地铁", max: 100 }
                    ],
                    shape: 'circle',
                    splitNumber: 4,
                    axisName: {
                        color: '#4c9bfd',
                        fontSize:9,
                    },
                    splitLine: {
                        lineStyle: {
                            color: [
                                'rgba(255, 255, 255, 0.1)',
                                'rgba(255, 255, 255, 0.2)',
                                'rgba(255, 255, 255, 0.4)',
                                'rgba(255, 255, 255, 0.6)',
                                'rgba(255, 255, 255, 0.8)',
                                'rgba(255, 255, 255, 1)'
                            ].reverse()
                        }
                    },
                    splitArea: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.4)'
                        }
                    }
                },
                series: [
                    {
                        name: 'Beijing',
                        type: 'radar',
                        lineStyle: lineStyle,
                        data: [[55, 19, 56, 11, 34]],
                        // 设置圆形标记（拐点）
                        symbol: 'circle',
                        // 设置拐点大小
                        symbolSize:5,
                        // 在拐点上显示相关数据
                        label: {
                            show: true,
                            fontSize:10,
                            color:"#fff"
                        },
                        // 设置整体颜色
                        itemStyle: {
                            color: '#fff'
                        },
                        areaStyle: {
                            color:"rgba(238,197,102,0.6)"
                        }
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
.channel {
  flex: 1;
  height: 2.9rem;
}
.channel {
  margin-right: 0.25rem;
}
.channel .data {
  overflow: hidden;
}
.channel .data .radar {
  height: 2.1rem;
  width: 100%;
}
.channel h4 {
  color: #fff;
  font-size: 0.4rem;
  margin-bottom: 0.0625rem;
}
.channel small {
  font-size: 50%;
}
.channel span {
  display: block;
  color: #4c9bfd;
  font-size: 0.175rem;
}
</style>