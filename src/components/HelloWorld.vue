<template>
  <div class="viewport">
    <div class="column">
      <!-- 概览区域模块 -->
      <overview></overview>
      <!-- 监控区域模块制作 -->
      <monitor></monitor>
      <!-- 点位分布统计 -->
      <point-pannel></point-pannel>
    </div>
    
    <div class="column">
      <!-- 地图模块制作 -->
      <mapPannel></mapPannel>
      <!-- 用户统计模块 -->
      <userPannel></userPannel>
    </div>
    <div class="column">
      <!-- 订单模块（搞反了） -->
      <salesPannel></salesPannel>
      <!-- 销售模块 -->
      <orderPannel></orderPannel>
      <!-- 渠道分布以及季度销售模块 -->
      <div class="wrap">
          <!-- 渠道分布模块 -->
          <channePanel></channePanel>
          <!-- 销售进度模块 -->
          <quarterPanel></quarterPanel>
      </div>
      <topPanel></topPanel>
    </div>
  </div>
</template>

<script>
import overview from "./panel/overview.vue"
import monitor from "./panel/monitor.vue"
import pointPannel from "./panel/point-pannel.vue"
import mapPannel from "./panel/map.vue"
import userPannel from "./panel/user-pannel.vue"
import salesPannel from "./panel/sale-panel.vue"
import orderPannel from "./panel/orderPannel.vue"
import channePanel from "./panel/channel-panel.vue"
import quarterPanel from "./panel/quarter-panel.vue"
import topPanel from "./panel/top-panel.vue"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(){

    return {

    }
  },
  components: {
    overview,
    monitor,
    pointPannel,
    mapPannel,
    userPannel,
    salesPannel,
    orderPannel,
    channePanel,
    quarterPanel,
    topPanel
  }
}
</script>

<style lang="less" scoped>
  .viewport {
    display: flex;
    min-width: 1024px;
    max-width: 1920px;
    min-height: 780px;
    margin: 0 auto;
    padding: 1.1rem .25rem 0;
    background: url(/src/assets/images/logo.png) no-repeat;
    background-size: contain;

    .column {
      flex: 3;
    }

    .column:nth-child(2) {
      flex: 4;
      margin: 0.4rem 0.25rem 0;
    }
  }
  .wrap {
  display: flex;
  }
</style>