export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function() {
  }
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
export function isPlainObject(val) {
  if (Object.prototype.toString.call(val) !== '[object Object]') {
    return false
  }

  const prototype = Object.getPrototypeOf(val)
  return prototype === null || prototype === Object.prototype
}

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
export function isArray(val) {
  return toString.call(val) === '[object Array]'
}

/**
 * 获取对象的Key:Value字符串，过滤掉undefined
 * @param obj
 * @returns {string}
 */
export function getObjectKeyValueToString(obj) {
  if (!obj) {
    return
  }

  const keys = Object.keys(obj)
  const keyValue = keys.map((key) => {
    if (obj[key]) {
      return `${key}:${obj[key]}`
    }
  })
  return keyValue.filter(value => !(!value || value === '')).join(',') || null
}

/**
 * 根据 key 把 arr 转换成 TreeData
 * @param arr
 * @param key
 * @returns {[]}
 */
export function toTreeData(arr, key) {
  // 删除所有的children,以防止多次调用
  arr.forEach(function(item) {
    delete item.children
  })
  const map = {}// 构建map
  arr.forEach(i => {
    map[i[key]] = i // 构建以id为键 当前数据为值
  })
  const treeData = []
  arr.forEach(child => {
    const mapItem = map[child.parent_id]// 判断当前数据的parent_id是否存在map中
    if (mapItem) { // 存在则表示当前数据不是最顶层的数据
      // 注意： 这里的map中的数据是引用了arr的它的指向还是arr,当mapItem改变时arr也会改变，踩坑点
      (mapItem.children || (mapItem.children = [])).push(child)// 这里判断mapItem中是否存在child
    } else { // 不存在则是顶层数据
      treeData.push(child)
    }
  })
  return treeData
}

/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 * @return {Any}
 */
export function deepClone(values) {
  let copy

  // Handle the 3 simple types, and null or undefined
  if (values == null || typeof values !== 'object') return values

  // Handle Date
  if (values instanceof Date) {
    copy = new Date()
    copy.setTime(values.getTime())
    return copy
  }

  // Handle Array
  if (values instanceof Array) {
    copy = []
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i])
    }
    return copy
  }

  // Handle Object
  if (values instanceof Object) {
    copy = {}
    for (const attr in values) {
      if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr])
    }
    return copy
  }

  throw new Error('Unable to copy values! Its type isn\'t supported.')
}

/**
 * 下划线转换驼峰
 * @param name
 * @returns {*}
 */
export function toHump(name) {
  // eslint-disable-next-line no-useless-escape
  return name.replace(/\_(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}

/**
 * 驼峰转换下划线
 * @param name
 * @returns {string}
 */
export function toLine(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}
