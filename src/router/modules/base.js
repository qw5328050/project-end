export default [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  // 授权页（获取token）
  {
    path: '/empower',
    component: () => import('@/views/login/empower'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]
