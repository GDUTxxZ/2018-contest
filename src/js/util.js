// 通用工具库

function getDomStyle (el) { // 获取元素当前样式
    if (window.getComputedStyle) {
        return window.getComputedStyle(el, null)
    } else {
        return el.currentStyle
    }
}

function addEvent (obj, type, fn) { // 事件绑定
    if (obj.addEventListener)
        obj.addEventListener(type, fn)
    else if (obj.attachEvent) {
        obj.attachEvent('on' + type, fn)
    }
}

function copy (obj) { // 利用JSON返回一个拷贝，不可 循环引用或含有function
    return JSON.parse(JSON.stringify(obj))
}