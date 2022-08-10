/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {object} obj
 * 对象转query参数
 */
export function objectToQueryString(obj) {
  return Object.keys(obj).map(function(key) {
    return ''.concat(encodeURIComponent(key), '=').concat(encodeURIComponent(obj[key]))
  }).join('&')
}

/**
 * @param {object} obj
 * 去除对象属性为空和null undefined的
 */
export function delEmtQueryNodes(obj) {
  Object.keys(obj).forEach(function(key) {
    const value = obj[key]
    value && typeof value === 'object' && delEmtQueryNodes(value);
    (value === '' || value === null || value === undefined)
  })
  return obj
}

// 转化大小写返回大写
export function chineseNumber(n) {
  var fraction = ['角', '分']
  var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  var head = n < 0 ? '负' : ''
  n = Math.abs(n)
  var s = ''
  for (var i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)
  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = ''
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return (
    head +
        s
          .replace(/(零.)*零元/, '元')
          .replace(/(零.)+/g, '零')
          .replace(/^整$/, '零元整')
  )
}

