<template>
      <div class="column">
      <div class="panel overview">
        <div class="panel-inner">
            <ul>
                <li v-for="(item,i) of overviewData" :key="i">
                    <h4>{{item.number}}</h4>
                    <span>
                        <i class="icon-dot" :style="item.icon"></i>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
      </div>
    </div>
</template>

<script>
import {reactive,toRefs} from "vue"
export default {
    name: "overview",
    setup() {
        const overviewData = reactive([
            {number:'2,190', name: "设备总数", icon:{color: "#006cff"}},
            {number:'190', name: "季度新增", icon:{color: "#6acca3"}},
            {number:'3,001', name: "运营设备", icon:{color: "#6acca3"}},
            {number:'108', name: "异常设备", icon:{color: "#ed3f35"}}
        ]) 


        return {
            overviewData
        }
    }
}
</script>

<style lang="less" scoped>
    .overview {
        height: 1.375rem;

        ul {
            display: flex;
            justify-content: space-between;

            h4 {
                font-size: 0.35rem;
                color: #fff;
                margin: 0 0 0.1rem 0.06rem;
            }
            span {
                font-size: 0.2rem;
                color: #4c9bfd;
            }
        }
    }
</style>>