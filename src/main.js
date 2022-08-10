import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import { getDictionaryLabel, getDictionaryValue } from '@/utils/dictionary'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/utils/watermark'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import permission from './directive'

import '@/icons' // icon
import '@/permission' // permission control
// 自定义表格工具扩展
import RightToolbar from '@/components/RightToolbar'
import Pagination from '@/components/Pagination'

// 注册滚动条加载触发事件v-loadmore绑定
import '@/directives'

Vue.component('RightToolbar', RightToolbar)
Vue.component('Pagination', Pagination)
Vue.prototype.getDictionaryLabel = getDictionaryLabel
Vue.prototype.getDictionaryValue = getDictionaryValue

import { debounce, formatMonenyNumber } from '@/utils/index'
Vue.prototype.$debounce = debounce // 防抖节流
Vue.prototype.$formatMonenyNumber = formatMonenyNumber // 数字转金额格式（千分位加逗号）

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
Vue.use(permission)
Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
