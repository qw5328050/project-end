/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
import store from '@/store'

export function vIfDomHasPermi(value) {
  const permissions = store.getters && store.getters.permissions
  if (value && value instanceof Array && value.length > 0) {
    const permissionFlag = value
    const hasPermissions = permissions.some((permission) => {
      return permissionFlag.includes(permission)
    })
    if (
      store.getters.selectUserOrg &&
      store.getters.selectUserOrg.orgType === 8
    ) {
      if (!hasPermissions) {
        return false
      } else {
        return true
      }
    } else {
      if (!permissionFlag.includes('isAll')) {
        return false
      } else {
        return true
      }
    }
  } else {
    return false
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function computedTime(old) {
  // 传入之前的时间  时间格式为(YY-MM-DD HH:MM:SS)
  var returnText = ''
  var nowDate = new Date().getTime() // 当前时间
  var setDate = new Date(old).getTime()
  var times = Math.floor((nowDate - setDate) / 1000)
  if (times > 60 * 60 * 24 * 365) {
    returnText = Math.floor(times / (60 * 60 * 24 * 365)) + '年前'
  } else if (times > 60 * 60 * 24 * 30) {
    returnText = Math.floor(times / (60 * 60 * 24 * 30)) + '个月前'
  } else if (times > 60 * 60 * 24) {
    returnText = Math.floor(times / (60 * 60 * 24)) + '天前'
  } else if (times > 60 * 60) {
    returnText = Math.floor(times / (60 * 60)) + '小时前'
  } else if (times > 60) {
    returnText = Math.floor(times / 60) + '分钟前'
  } else if (times >= 0) {
    returnText = Math.floor(times / 1) + '秒前'
  } else if (times < 0) {
    returnText = '0秒'
  } else {
    returnText = '系统错误,必须传入当前时间之前的数值'
  }
  return returnText
}
/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach((v) => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function handleBlobResponse(response, Message) {
  const res = response.data
  const blob = new Blob([res])
  return new Promise((resolve, reject) => {
    // 返回的文件错误处理
    if (res.type === 'application/json') {
      const fileReader = new FileReader()
      fileReader.readAsText(blob, 'utf-8')
      fileReader.onload = () => {
        const message = JSON.parse(fileReader.result).msg || 'Error'
        Message({ message: message, type: 'error', duration: 5000 })
        reject(message)
      }
    } else {
      // 创建一个临时的url指向blob对象
      const url = window.URL.createObjectURL(blob)
      var downloadElement = document.createElement('a')
      document.body.appendChild(downloadElement)
      downloadElement.href = url
      const contentDisposition = response.headers['content-disposition'] || {}
      if (!contentDisposition) {
        const message = '文件或文件名不存在!'
        Message({ message: message, type: 'error', duration: 5000 })
        reject(message)
      }
      const fileName = contentDisposition.split('=').pop()
      if (fileName) downloadElement.download = decodeURI(fileName)
      downloadElement.click()
      document.body.removeChild(downloadElement) // 下载完成移除元素
      window.URL.revokeObjectURL(url) // 释放这个临时的对象url
      resolve(res)
    }
  })
}

// 将时间转换成几天前，几个月前，几小时前等
export function getDateDiff(dateTimeStamp) {
  // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  var result
  var minute = 1000 * 60 // 把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60
  var day = hour * 24
  var week = day * 7
  var halfamonth = day * 15
  var month = day * 30
  var now = new Date().getTime() // 获取当前时间毫秒
  // console.log(now)
  var diffValue = now - dateTimeStamp // 时间差

  if (diffValue < 0) {
    return
  }
  var minC = diffValue / minute // //计算时间差的分，时，天，周，月
  var hourC = diffValue / hour
  var dayC = diffValue / day
  var weekC = diffValue / week
  var monthC = diffValue / month
  if (monthC >= 1 && monthC <= 3) {
    result = ' ' + parseInt(monthC) + '月前'
  } else if (weekC >= 1 && weekC <= 3) {
    result = ' ' + parseInt(weekC) + '周前'
  } else if (dayC >= 1 && dayC <= 6) {
    result = ' ' + parseInt(dayC) + '天前'
  } else if (hourC >= 1 && hourC <= 23) {
    result = ' ' + parseInt(hourC) + '小时前'
  } else if (minC >= 1 && minC <= 59) {
    result = ' ' + parseInt(minC) + '分钟前'
  } else if (diffValue >= 0 && diffValue <= minute) {
    // && diffValue <= minute
    result = '刚刚'
  } else {
    var datetime = new Date()
    datetime.setTime(dateTimeStamp)
    var Nyear = datetime.getFullYear()
    var Nmonth =
      datetime.getMonth() + 1 < 10
        ? '0' + (datetime.getMonth() + 1)
        : datetime.getMonth() + 1
    var Ndate =
      datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
    var Nhour =
      datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
    var Nminute =
      datetime.getMinutes() < 10
        ? '0' + datetime.getMinutes()
        : datetime.getMinutes()
    var Nsecond =
      datetime.getSeconds() < 10
        ? '0' + datetime.getSeconds()
        : datetime.getSeconds()
    result = Nyear + '-' + Nmonth + '-' + Ndate
  }
  return result
}
// 将标准时间转换成时间戳
export function getDateTimeStamp(dateStr) {
  return Date.parse(dateStr.replace(/-/gi, '/'))
}

export function getNewArr(arr) {
  if (arr && arr.length > 0) {
    // 定义新数组用于存储所有元素
    var newArr = []
    // 遍历原数组中的每个元素
    for (var i = 0; i < arr.length; i++) {
      // 判断当前元素是否为数组
      if (Array.isArray(arr[i].childList)) {
        // 若当前元素为数组时，调用函数本身继续判断，通过 concat 方法连接函数返回的数组
        newArr.push(arr[i])
        newArr = newArr.concat(getNewArr(arr[i].childList))
      } else {
        // 若不是数组直接将当前元素追加到新数组的末尾
        newArr.push(arr[i])
      }
    }
    // 循环结束将新数组返回
    return newArr
  } else {
    return []
  }
}

export function ifArrVal(arr, obj) {
  // 多维数组判断是否存在某值
  const newArr = getNewArr(arr) || []
  if (newArr && newArr.length > 0 && obj) {
    return newArr.some((item) => item.id === obj.id)
  }
}
export function ifArrValData(arr, obj) {
  // 多维数组判断是否存在的一个某值
  const newArr = getNewArr(arr) || []
  let data = null
  if (newArr && newArr.length > 0 && obj) {
    newArr.forEach((item) => {
      if (item.id === obj.id) {
        data = item
      }
    })
  }
  return data
}

// 只能输入>0的正整数  保留2位小数
export function checkNum(rule, value, cb) {
  var reg = /^[+-]?\d*\.?\d{1,2}$/
  if (value == '' || value == null || value == 'undefined') {
    return cb('不能为空')
  } else if (value && !reg.test(value)) {
    return cb('请输入最多2位整数')
  } else if (value <= 0) {
    return cb('不能小于等于0')
  } else {
    return cb()
  }
}

/**
 * 将数字转化成金额格式，千分位自动添加逗号，存在小数时默认保留两位小数
 *
 * @param {(string|number)} number
 * @param {(string|number)} toFixed
 * @returns
 */
export function formatMonenyNumber(number, toFixed = 2) {
  const str = []
  if (!number) return 0
  if (typeof number === 'number') number = String(number)
  const tempNumber = number.split('.')
  number = tempNumber[0]
  if (number.length <= 3) {
    if (tempNumber[1]) {
      number += '.' + tempNumber[1].slice(0, toFixed)
    }
    return number
  }
  number
    .split('')
    .reverse()
    .forEach((item, index) => {
      if (index != 0 && index % 3 == 0) {
        str.push(',', item)
      } else {
        str.push(item)
      }
    })
  number = str.reverse().join('')
  if (tempNumber[1]) {
    number += '.' + tempNumber[1].slice(0, toFixed)
  }
  return number
}
