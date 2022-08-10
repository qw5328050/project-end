import Layout from '@/layout'
export default [
  {
    path: '/superLastMange',
    component: Layout,
    redirect: '/superLastMange/index',
    haveMenuModule: 'material',
    hasPermi: [
    ],
    meta: {
      title: '剩余物资管理',
      icon: 'todo'
    },
    children: [
      {
        path: 'index',
        hasPermi: [''],
        component: () => import('@/views/superLastMange/index'),
        meta: {
          title: '物资调拨',
          icon: 'todo',
          keepAlive: true
        }
      },
      {
        path: 'add',
        hidden:true,
        component: () => import('@/views/superLastMange/Ask'),
        meta: {
          title: '物资调拨申请',
        }
      },
      {
        path: 'add/:id',
        hidden:true,
        component: () => import('@/views/superLastMange/Ask'),
        meta: {
          title: '物资调拨编辑',
        }
      },
      {
        path: 'allocationAdd/:applySerial',
        hidden:true,
        component: () => import('@/views/superLastMange/Input'),
        meta: {
          title: '物资调拨录入',
          icon: 'todo',
          keepAlive: true
        }
      },
      {
        path: 'transferAskDetail/:applySerial',
        hidden:true,
        component: () => import('@/views/superLastMange/AskDetail'),
        meta: {
          title: '调拨申请单详情',
          icon: 'todo',
          keepAlive: true
        }
      },
      {
        path: 'transferInputDetail/:entrySerial',
        hidden:true,
        component: () => import('@/views/superLastMange/InputDetail'),
        meta: {
          title: '调拨录入单详情',
          icon: 'todo',
          keepAlive: true
        }
      },

    ]
  }
]
