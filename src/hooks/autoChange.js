export default function({todo,timeItv=5000,index=1,length=2}) {
    if (typeof todo !== 'function') {
        console.warn("没有传递要执行的函数")
        return
    }
    let timer
    function timerToChange() {
        timer = setInterval(() => {
            todo(index)
            index++
            if (index >= length) {
                index = 0
            }
        },timeItv) 
    }
    timerToChange()
    // 清除与重开定时器
    function clearTimer() {
        clearInterval(timer)
    }
    function setTimer() {
        timerToChange()
    }
    function changIndex(i) {
        index = i+1
    }

    return {
        clearTimer,
        setTimer,
        changIndex
    }
}