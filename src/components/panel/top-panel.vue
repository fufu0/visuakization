<template>
  <!-- 全国热榜模块制作 -->
        <div class="top panel">
          <div class="panel-inner"
            @mouseleave="setTimer"
            @mouseenter="clearTimer"
          >
            <div class="all">
              <h3>全国热榜</h3>
              <ul>
                <li>
                  <i class="icon-cup1" style="color: #d93f36;"></i>
                  可爱多
                </li>
                <li>
                  <i class="icon-cup2" style="color: #68d8fe;"></i>
                  娃哈啥
                </li>
                <li>
                  <i class="icon-cup3" style="color: #4c9bfd;"></i>
                  喜之郎
                </li>
              </ul>
            </div>
            <div class="province">
              <h3>各省热销 <i class="date">// 近30日 //</i></h3>
              <div class="data">
                <ul class="sup">
                  <li 
                    v-for="(item,i) in hotData" 
                    :key="i" 
                    @mouseenter="changeIndex(i);changeBrand(i);changIndex(i)"
                    :class="{active: activeIndex === i}"
                >
                    <span>{{item.city}}</span>
                    <span>{{item.sales}} <s :class="item.flag ? 'icon-up':'icon-down'"></s></span>
                  </li>
                  <!-- <li>
                    <span>河北</span>
                    <span>23,252 <s class="icon-down"></s></span>
                  </li> -->
                </ul>
                <ul class="sub">
                  <li
                     v-for="(item,i) in brands" 
                    :key="i" 
                  >
                    <span>{{item.name}}</span>
                    <span>{{item.num}}<s :class="item.flag ? 'icon-up':'icon-down'"></s></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
import classChange from "../../hooks/classChange"
import autoChange from '../../hooks/autoChange'
import {reactive,toRefs} from "vue"
export default {
    name:"topPanel",
    setup(){
        const hotData = [
            {
            city: "北京", // 城市
            sales: "25, 179", // 销售额
            flag: true, //  上升还是下降
            brands: [
                //  品牌种类数据
                { name: "可爱多", num: "9,086", flag: true },
                { name: "娃哈哈", num: "8,341", flag: true },
                { name: "喜之郎", num: "7,407", flag: false },
                { name: "八喜", num: "6,080", flag: false },
                { name: "小洋人", num: "6,724", flag: false },
                { name: "好多鱼", num: "2,170", flag: true }
            ]
            },
            {
            city: "河北",
            sales: "23,252",
            flag: false,
            brands: [
                { name: "可爱多", num: "3,457", flag: false },
                { name: "娃哈哈", num: "2,124", flag: true },
                { name: "喜之郎", num: "8,907", flag: false },
                { name: "八喜", num: "6,080", flag: true },
                { name: "小洋人", num: "1,724", flag: false },
                { name: "好多鱼", num: "1,170", flag: false }
            ]
            },
            {
            city: "上海",
            sales: "20,760",
            flag: true,
            brands: [
                { name: "可爱多", num: "2,345", flag: true },
                { name: "娃哈哈", num: "7,109", flag: true },
                { name: "喜之郎", num: "3,701", flag: false },
                { name: "八喜", num: "6,080", flag: false },
                { name: "小洋人", num: "2,724", flag: false },
                { name: "好多鱼", num: "2,998", flag: true }
            ]
            },
            {
            city: "江苏",
            sales: "23,252",
            flag: false,
            brands: [
                { name: "可爱多", num: "2,156", flag: false },
                { name: "娃哈哈", num: "2,456", flag: true },
                { name: "喜之郎", num: "9,737", flag: true },
                { name: "八喜", num: "2,080", flag: true },
                { name: "小洋人", num: "8,724", flag: true },
                { name: "好多鱼", num: "1,770", flag: false }
            ]
            },
            {
            city: "山东",
            sales: "20,760",
            flag: true,
            brands: [
                { name: "可爱多", num: "9,567", flag: true },
                { name: "娃哈哈", num: "2,345", flag: false },
                { name: "喜之郎", num: "9,037", flag: false },
                { name: "八喜", num: "1,080", flag: true },
                { name: "小洋人", num: "4,724", flag: false },
                { name: "好多鱼", num: "9,999", flag: true }
            ]
            }
        ];

        // 切换数据相关
        const brandsData = reactive({
            brands:""
        })
        function changeBrand(i) {
            brandsData.brands = hotData[i].brands
        }
        changeBrand(0)
        // tab栏切换相关
        const classToChange = classChange()
        // 自动切换
        function autoSelf(index) {
            changeBrand(index)
            classToChange.changeIndex(index)
        }

        const autoRes = autoChange({
            todo: autoSelf,
            timeItv: 3000,
            length:Object.keys(hotData).length
        })

        return {
            hotData,
            ...classToChange,
            ...toRefs(brandsData),
            changeBrand,
            ...autoRes
        }
    }
}
</script>

<style scoped>
/* 全国热榜模块制作 */
/* 排行榜 */
.top {
  height: 3.5rem;
}
.top .panel-inner {
  display: flex;
}
.top .all {
  display: flex;
  flex-direction: column;
  width: 2.1rem;
  color: #4c9bfd;
  font-size: 0.175rem;
  vertical-align: middle;
}
.top .all ul {
  padding-left: 0.15rem;
  margin-top: 0.15rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.top .all li {
  overflow: hidden;
}
.top .all [class^="icon-"] {
  font-size: 0.45rem;
  vertical-align: middle;
  margin-right: 0.15rem;
}
.top .province {
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #fff;
}
.top .province i {
  padding: 0 0.15rem;
  margin-top: 0.0625rem;
  float: right;
  font-style: normal;
  font-size: 0.175rem;
  color: #0bace6;
}
.top .province s {
  display: inline-block;
  transform: scale(0.8);
  text-decoration: none;
}
.top .province .icon-up {
  color: #dc3c33;
}
.top .province .icon-down {
  color: #36be90;
}
.top .province .data {
  flex: 1;
  display: flex;
  margin-top: 0.175rem;
}
.top .province ul {
  flex: 1;
  line-height: 1;
  margin-bottom: 0.175rem;
}
.top .province ul li {
  display: flex;
  justify-content: space-between;
}
.top .province ul span {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.top .province ul.sup {
  font-size: 0.175rem;
}
.top .province ul.sup li {
  color: #4995f4;
  padding: 0.15rem;
}
.top .province ul.sup li.active {
  color: #a3c6f2;
  background-color: rgba(10, 67, 188, 0.2);
}
.top .province ul.sub {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 0.15rem;
  background-color: rgba(10, 67, 188, 0.2);
}
.top .province ul.sub li {
  color: #52ffff;
  padding: 0.125rem 0.175rem;
}
.clock {
  position: absolute;
  top: -0.45rem;
  right: 0.5rem;
  font-size: 0.25rem;
  color: #0bace6;
}
.clock i {
  margin-right: 5px;
  font-size: 0.25rem;
}
@media screen and (max-width: 1600px) {
  .top span {
    transform: scale(0.9);
  }
  .top .province ul.sup li {
    padding: 0.125rem 0.15rem;
  }
  .top .province ul.sub li {
    padding: 0.0625rem 0.15rem;
  }
  .quarter span {
    transform: scale(0.9);
  }
}
</style>