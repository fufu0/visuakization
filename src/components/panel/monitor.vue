<template>
  <div class="panel monitor">
          <div class="panel-inner">
            <!-- tab栏 -->
            <div class="tabs">
              <a 
                v-for="(item,i) in title"
                :key="i"
                href="javascript:;" 
                :class="{active: activeIndex === i}"
                @click="changeIndex(i)"
              >
                故障设备监控
             </a>
            </div>
            <!-- 内容栏 -->
            <div 
                class="content" 
                v-for="(item,i) in list" 
                :key="i"
                v-show="activeIndex === i"
            >
              <div class="head">
                <span class="col" v-for="(name,nameIndex) in item.listName" :key="nameIndex">{{name}}</span>
              </div>
              <div class="marquee-view">
                <div class="marquee">
                  <div class="row" v-for="(listContent,contentIndex) in 18" :key="contentIndex">
                    <span class="col">20180701</span>
                    <span class="col">{{item.listContent}}</span>
                    <span class="col">100000{{contentIndex < 9 ? contentIndex + 1 : contentIndex - 8}}</span>
                    <span class="icon-dot"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
import {reactive,toRefs} from "vue"
import classChange from "../../hooks/classChange"
export default {
    name:"monitor",
    setup() {
        // 监控页面数据相关
        const monitorData = reactive({
            title: ["故障设备监控","异常设备监控"],
            list:[
                {
                    listName:["故障时间","设备地址","故障代码"],
                    listContent:"北京市昌平西路金燕龙写字楼"
                },
                {
                    listName:["异常时间","设备地址","异常代码"],
                    listContent:"北京市昌平区建材城西路金燕龙写字楼"
                }
            ]
        })
        
        return {
            ...toRefs(monitorData),
            ...classChange()
        }
    }
}
</script>

<style scoped>
    /* 监控区域模块制作 */
    .monitor {
    height: 6rem;
    }
    .monitor .panel-inner {
    padding: 0.3rem 0;
    display: flex;
    flex-direction: column;
    }
    .monitor .tabs {
    padding: 0 0.45rem;
    margin-bottom: 0.225rem;
    display: flex;
    }
    .monitor .tabs a {
    color: #1950c4;
    font-size: 0.225rem;
    padding: 0 0.3375rem;
    }
    .monitor .tabs a:first-child {
    padding-left: 0;
    border-right: 0.025rem solid #00f2f1;
    }
    .monitor .tabs a.active {
    color: #fff;
    }
    .monitor .content {
    flex: 1;
    position: relative;
    }
    .monitor .content.active {
    display: block;
    }
    .monitor .head {
    display: flex;
    justify-content: space-between;
    line-height: 1.05;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.15rem 0.45rem;
    color: #68d8fe;
    font-size: 0.175rem;
    }
    .monitor .marquee-view {
    position: absolute;
    top: 0.5rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    }

    .monitor .row {
    display: flex;
    justify-content: space-between;
    line-height: 1.05;
    font-size: 0.15rem;
    color: #61a8ff;
    padding: 0.15rem 0.45rem;
    }
    .monitor .row .icon-dot {
    position: absolute;
    left: 0.2rem;
    opacity: 0;
    }
    .monitor .row:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #68d8fe;
    }
    .monitor .row:hover .icon-dot {
    opacity: 1;
    }
    .monitor .col:first-child {
    width: 1rem;
    }
    .monitor .col:nth-child(2) {
    width: 2.5rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    }
    .monitor .col:nth-child(3) {
    width: 1rem;
    }
    /* 通过css3动画移动marquee */
    .marquee-view .marquee {
    animation: move 15s linear infinite;
    }
    @keyframes move {
        0% {
        }
        100% {
            transform: translateY(-50%);
        }
    }
    /* 鼠标经过marquee停止动画 */
    .marquee-view .marquee:hover {
        animation-play-state: paused;
    }
</style>