import Layout from '@/layout'
export default [
  {
    path: '/borrowSys',
    component: Layout,
    redirect: '/borrowSys/index',
    haveMenuModule: 'material',
    hasPermi: [
    ],
    meta: {
      title: '租赁物资管理',
      icon: 'todo'
    },
    children: [
      {
        path: 'index',
        hasPermi: [''],
        component: () => import('@/views/borrowSys/index'),
        meta: {
          title: '租赁物资列表',
          icon: 'todo',
          keepAlive: true
        }
      },
      {
        path: 'stopDoc',
        hidden: true,
        component: () => import('@/views/borrowSys/stopDoc'),
        meta: {
          title: '报停'
        }
      },
      {
        path: 'returnTable',
        hasPermi: [''],
        component: () => import('@/views/borrowSys/returnTable'),
        meta: {
          title: '填写退料表单据',
          icon: 'todo',
          keepAlive: true
        }
      },
      {
        path: 'returnTableEidht',
        hasPermi: [''],
        component: () => import('@/views/borrowSys/returnTableEidt'),
        meta: {
          title: '编辑退料表',
          icon: 'todo'
        }
      },
      {
        path: 'prucReportStop',
        hasPermi: [''],
        component: () => import('@/views/borrowSys/prucReportStop'),
        meta: {
          title: '报停详情',
          icon: 'todo'
        }
      },
      {
        path: 'rejectGoodsDetail',
        hasPermi: [''],
        component: () => import('@/views/borrowSys/rejectGoodsDetail'),
        meta: {
          title: '退料单详情',
          icon: 'todo'
        }
      }
    ]
  }
]
