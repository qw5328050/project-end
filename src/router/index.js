import Vue from 'vue'
import Router from 'vue-router'
import RouterConfig from './modules' // 引入不同业务模块路由

Vue.use(Router)
/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * 在什么模块下显示菜单（配置给一级菜单）
 * haveMenuModule: 'workbench'         工作台显示
 *                 'systemManagement'  系统管理显示
 *                 'masterData'        主数据显示
 *                 'businessCenter'    业务中心显示
 *                 'material'          物资管理
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/workbench/todo/index',
    haveMenuModule: 'workbench',
    children: [
      {
        path: 'index',
        name: 'index',
        hidden: true,
        component: () => import('@/views/dashboard/index2'),
        meta: { title: '首页', icon: 'home' }
      },
      {
        path: 'noPermissions',
        name: '',
        hidden: true,
        component: () => import('@/views/noPermissions'),
        meta: { title: '暂无权限', icon: 'home' }
      }
    ]
  },
  {
    path: '/workGallery',
    component: () => import('@/views/dashboard/index'),
    haveMenuModule: 'workbench'
  },
  /* {
    path: '/system',
    component: Layout,
    redirect: '/system/account',
    name: 'system',
    haveMenuModule: 'workbench',
    meta: {
      title: '系统管理'
    },
    children: [
      {
        path: 'organization',
        name: 'Organization',
        component: () => import('@/views/system/organization/index'),
        meta: {
          title: '组织管理'
        }
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/system/account/index'),
        meta: {
          title: '账号管理'
        }
      },
      {
        path: 'employees',
        name: 'Employees',
        component: () => import('@/views/system/employees/index'),
        meta: {
          title: '员工管理'
        }
      }
    ]
  }, */

  ...RouterConfig,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
