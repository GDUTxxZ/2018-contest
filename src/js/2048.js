let data = [[2, 0, 2, 0], [4, 4, 0, 0], [0, 2, 2, 0], [0, 0, 0, 0]] // 初始化
const container = document.querySelector('#main')
const bg = document.querySelector('#bg')

const keyCodeMap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
}

function main () { // 主程序
    // 调整背景和实体宽高
    resize(container)
    resize(bg)
    
    // 初始化背景和实体元素
    paint(bg, data)
    // 创建1-2个初始元素
    createNewElement()
    paint(container, data)

    // 绑定事件监听器
    addEvent(window, 'keydown', function (event) {
        let arrow = keyCodeMap[event.keyCode]
        switch (arrow) {
            case 'left':
            case 'up':
            case 'right':
            case 'down': {
                moveHandle['move' + arrow]()
                break
            }
        }
    })

    console.log(data)
}

function resize(el) { // 调整元素宽高一致
    let style = getDomStyle(el)
    el.style.height = style.width
}

let emptyList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] // 当前没有元素的格子
function createNewElement () { // 在data中产生1~2个新的元素
    const {
        random,
        ceil,
        floor
    } = Math
    let n = ceil(random() * 2)
    let len = emptyList.length
    while(n && len) { // 如果没有空位或者已经产生足够多的元素了
        let index = emptyList.splice(floor(random() * len), 1)[0] // 要产生新元素的位置
        let i = floor(index / 4)
        let j = index % 4
        data[i][j] = ceil(random() * 2) * 2
        n--
        len--
    }
}


function paint(el, data) { // 绘制各个元素
    el.innerHTML = ''
    let documentFranme = document.createDocumentFragment()
    for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
            let value = data[i][j]
            let dom = document.createElement('div')
            dom.className = 'item' + ' ' + 'item-' + value
            dom.id = (i + 1) + '-' + (j + 1) // 第i+1行第j+1个
            if (value) { // 如果有值
                let text = document.createTextNode(value)
                dom.appendChild(text)
            }
            documentFranme.appendChild(dom)
        }
    }
    el.appendChild(documentFranme)
}

const moveHandle = { // 移动句柄
// 计算移动后的data和要移动的元素的移动坐标
// 动画
// 重绘元素
    moving: false, // 锁定句柄，防止动画中断
    moveleft: function () {
        // 计算移动后的data和要移动的元素的移动坐标
        let newData = copy(data) // 获取当前数据的一个copy

        for (let i = 0; i < 4; i++) { // 一行行处理
            let newList = [] // 新行
            let oldList = data[i]

            for (let j = 0; j < 4; j++) { // 找到所有非0单元
                let value = newData[i][j]
                if (value !== 0) {
                    newList.push(value)
                }
            }

            if (newList.length > 1) { // 合并同类项
                for (let j = 0, len = newList.length; j < len - 1; j++) {
                    if (newList[j] === newList[j + 1]) {
                        newList[j] *= 2
                        newList[j + 1] = 0
                        j++
                    }
                }
                newList = newList.filter(item => item !== 0) // 过滤掉上一步产生的0
            }

            for (let j = newList.length; j < 4; j++) { // 补全数列尾部的0
                newList.push(0)
            }

            newData[i] = newList

            // 产生每位元素移动的坐标
            for (let j = 0, k = 0; j < 4; j++) {
                if (oldList[j] === newList[k]) { // j移动到k位置

                }
            }
        }

        console.log(newData)

        console.log('moveleft')
    },
    moveup: function () {
        console.log('moveup')
    },
    moveright: function () {
        console.log('moveright')
    },
    movedown: function () {
        console.log('movedown')
    }
}

main()
