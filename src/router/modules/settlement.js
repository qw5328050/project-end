import Layout from '@/layout'
export default [
  {
    path: '/settlement',
    component: Layout,
    redirect: '/settlement/abschluss',
    name: '月度结算管理',
    hasPermi: [
      'qy:menu:bs:material:settlement_manage:monthly:list:query',
      'qy:menu:bs:material:settlement_manage:monthly:pending_list:query',
      'qy:menu:bs:material:settlement_manage:master:pending_list:query',
      'qy:menu:bs:material:settlement_manage:master:list:query'
    ],
    haveMenuModule: 'material',
    meta: { title: '结算管理', icon: 'clearing' },
    children: [
      {
        path: 'abschluss',
        name: '月度结算管理',
        // hasPermi: 'qy:menu:bs:material:settlement_manage:monthly:list:query',
        hasPermi: [
          'qy:menu:bs:material:settlement_manage:monthly:list:query',
          'qy:menu:bs:material:settlement_manage:monthly:pending_list:query'
        ],
        component: () => import('@/views/settlement/abschluss/index'),
        meta: { title: '月度结算管理' }
      },
      {
        path: 'finalStatement',
        name: '月度结算单',
        hidden: true,
        component: () => import('@/views/settlement/finalStatement/index'),
        meta: { title: '月度结算单' }
      },
      {
        path: 'finalStatementEdit',
        name: '月度结算单详情',
        hidden: true,
        component: () => import('@/views/settlement/finalStatementEdit/index'),
        meta: { title: '月度结算单详情' }
      },
      {
        path: 'lumpsum',
        name: '总结算管理',
        // hasPermi: 'qy:menu:bs:material:settlement_manage:master:list:query',
        hasPermi: [
          'qy:menu:bs:material:settlement_manage:master:pending_list:query',
          'qy:menu:bs:material:settlement_manage:master:list:query'
        ],
        component: () => import('@/views/settlement/lumpsum/index'),
        meta: { title: '总结算管理' }
      },
      {
        path: 'generalStatement',
        name: '总结算单',
        hidden: true,
        component: () => import('@/views/settlement/generalStatement/index'),
        meta: { title: '总结算单' }
      },
      {
        path: 'generalStatementEdit',
        name: '总结算单',
        hidden: true,
        component: () =>
          import('@/views/settlement/generalStatementEdit/index'),
        meta: { title: '总结算单详情' }
      },
      {
        path: 'cancellation',
        name: '作废',
        hidden: true,
        component: () => import('@/views/settlement/cancellation/index'),
        meta: { title: '作废' }
      },
      {
        path: 'monthlyCancellation',
        name: '月度作废',
        hidden: true,
        component: () => import('@/views/settlement/monthlyCancellation/index'),
        meta: { title: '月度作废' }
      }
    ]
  }
]
