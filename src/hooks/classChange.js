import {reactive,toRefs} from "vue"
export default function(){
    // 样式切换相关
    const active = reactive({
        activeIndex:0
    })
    function changeIndex(i) {
        active.activeIndex = i
    }

    return {
        ...toRefs(active),
        changeIndex
    }
}