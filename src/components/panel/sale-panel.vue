<template>
    <!-- 销售额 -->
    <div class="sales panel">
        <div class="panel-inner" @mouseover="clearTimer" @mouseout="setTimer">
        <div class="caption">
            <h4>订单统计</h4>
            <a 
                href="javascript:;" 
                v-for="(item,i) in tab"
                :class="{active: activeIndex === i}"
                @click="changeIndex(i);changeDate(i,item.order,item.money);changIndex(i)"
                :key="i"
            >
            {{item.name}}
            </a>
        </div>
        <div class="chart">
            <ul>
                <li>
                     <CountFlop :val="order" class="order"/>
                    <span>
                        <i class="icon-dot" style="color: #ed3f35"></i>
                        订单量
                    </span>
                </li>
                <li>
                    <count-up :end-val="money" class="count"></count-up>
                    <span>
                        <i class="icon-dot" style="color: #6acca3"></i>
                        销售额（万元）
                    </span>
                </li>
            </ul>
        </div>
        </div>
    </div>
</template>

<script>
    import {reactive,toRefs} from "vue"
    import classChange from "../../hooks/classChange"
    import CountFlop from '../panel/CountFlop.vue'
    import CountUp from 'vue-countup-v3'
    import autoChange from '../../hooks/autoChange'
    export default {
        name:'salesPannel',
        components:{
            CountFlop,
            CountUp
        },
        setup(){
            // 销售额数据
            const saleDate = reactive({
                tab: [{
                    name:"年",
                    order: 21354323,
                    money: 45687323
                },{
                    name:"季",
                    order: 56988542,
                    money: 78454423
                },{
                    name:"月",
                    order: 4654643,
                    money: 134654321
                },{
                    name:"日",
                    order: 789485433,
                    money: 45645434
                }],
                order: 21354323,
                money: 45687323
            })
            saleDate.order = num2qfw(saleDate.order)

            // 改变销售数据,重置index
            let index = 1
            function changeDate(i,order,money) {
                index = i
                saleDate.order = num2qfw(order)
                saleDate.money = money
            }
            // 将数字转换为逗号隔开的千分位格式
            function num2qfw(num){
                num += '';
                if (!num.includes('.')) num += '.';
                return num.replace(/(\d)(?=(\d{3})+\.)/g, function(match, p1, p2, offset, string) {
                    return p1 + ',';
                }).replace(/\.$/, '');
            }
            const classToChange = classChange()


            // 自动切换的函数
            function autoSelf(index) {
                classToChange.activeIndex.value = index
                saleDate.order = num2qfw(saleDate.tab[index].order)
                saleDate.money = saleDate.tab[index].money
            }
            const autoRes = autoChange({
                todo: autoSelf,
                timeItv: 5000,
                index,
                length:saleDate.tab.length
            })


            return {
                ...toRefs(saleDate),
                ...classToChange,
                changeDate,
                ...autoRes
            }
        }
    }
</script>

<style scoped lang="less">
    /* 销售区域 */
.sales {
  height: 1.875rem;
}
.sales .caption {
  display: flex;
  line-height: 1;
}
.sales h4 {
  color: #fff;
  height: 0.225rem;
  font-size: 0.225rem;
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
.sales .inner {
  display: flex;
  flex-direction: column;
}
.sales .chart {
  height: 1rem;
  padding-top: 0.1875rem;
  position: relative;
}
ul {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    li {
        width: 50%;
    }
    .count {
        font-size: 0.35rem;
        color: #fff;
        margin: 0 0 0.06rem 0.06rem;
    }
    .order {
        margin: 0 0 0.06rem 0.06rem;
    }
    span {
        font-size: 0.2rem;
        color: #4c9bfd;
    }
}
</style>