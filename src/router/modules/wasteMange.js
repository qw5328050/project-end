import Layout from '@/layout'
export default [
  {
    path: '/wasteMange',
    component: Layout,
    redirect: '/wasteMange/index',
    haveMenuModule: 'material',
    hasPermi: [
    ],
    meta: {
      title: '废旧物资管理',
      icon: 'todo'
    },
    children: [
      {
        path: 'index',
        hasPermi: [''],
        component: () => import('@/views/wasteMange/index'),
        meta: {
          title: '废旧物资管理列表',
          icon: 'todo',
          keepAlive: true
        }
      },
      {
        path: 'add',
        hidden:true,
        component: () => import('@/views/wasteMange/components/WasteAdd'),
        meta: {
          title: '废旧物资申请',
        }
      },
      {
        path: 'add/:id',
        hidden:true,
        component: () => import('@/views/wasteMange/components/WasteAdd'),
        meta: {
          title: '废旧物资编辑',
        }
      },
      {
        path: 'recordAdd/:applySerial',
        hidden:true,
        component: () => import('@/views/wasteMange/components/RecordAdd'),
        meta: {
          title: '废旧物资新增记录',
        }
      },
      {
        path: 'askDetails/:id',
        hidden:true,
        component: () => import('@/views/wasteMange/ProcessAskDetail'),
        meta: {
          title: '废旧物资申请详情',
        }
      },
      {
        path: 'recordDetails/:recordSerial',
        hidden:true,
        component: () => import('@/views/wasteMange/ProcessRecordDetail'),
        meta: {
          title: '废旧物资处理记录详情',
        }
      },
      {
        path: 'fillingDetails/:filingSerial',
        hidden:true,
        component: () => import('@/views/wasteMange/ProcessFillingDetail'),
        meta: {
          title: '废旧物资处理立卷详情',
        }
      },
      {
        path: 'steelAdd/:applySerial',
        hidden:true,
        component: () => import('@/views/wasteMange/components/SteelAdd'),
        meta: {
          title: '废旧物资处理立卷',
          icon: 'todo',
          keepAlive: true
        }
      },
      
      // {
      //   path: 'transferAskDetail/:applySerial',
      //   hidden:true,
      //   component: () => import('@/views/superLastMange/AskDetail'),
      //   meta: {
      //     title: '调拨申请单详情',
      //     icon: 'todo',
      //     keepAlive: true
      //   }
      // },
      // {
      //   path: 'transferInputDetail/:entrySerial',
      //   hidden:true,
      //   component: () => import('@/views/superLastMange/InputDetail'),
      //   meta: {
      //     title: '调拨录入单详情',
      //     icon: 'todo',
      //     keepAlive: true
      //   }
      // },

    ]
  }
]
