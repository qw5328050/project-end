import Layout from '@/layout'

export default [
  {
    path: '/purchase',
    component: Layout,
    redirect: '/purchase/order',
    name: '订单管理',
    hasPermi: ['xm:menu:bs:material:purchase_manage:order:list:query', 'xm:menu:bs:material:purchase_manage:order:pending_list:query', 'xm:menu:bs:material:purchase_manage:acceptance:receipt_list:query', 'xm:menu:bs:material:purchase_manage:acceptance:return_list:query'],
    haveMenuModule: 'material',
    meta: {
      title: '订单管理',
      icon: 'purchase'
    },
    children: [
      {
        path: 'order',
        name: 'orderIndex',
        component: () => import('@/views/purchase/order/index'),
        hasPermi: ['xm:menu:bs:material:purchase_manage:order:list:query', 'xm:menu:bs:material:purchase_manage:order:pending_list:query'],
        meta: { title: '采购订单管理', icon: '' }
      },
      {
        path: 'placeOrder',
        name: '下采购订单',
        hidden: true,
        component: () => import('@/views/purchase/placeOrder/index'),
        meta: { title: '下采购订单', icon: '' }
      },
      {
        path: 'edit',
        name: '编辑采购订单',
        hidden: true,
        component: () => import('@/views/purchase/edit/index'),
        meta: { title: '编辑采购订单', icon: '' }
      },
      {
        path: 'purchaseDetails',
        name: '订单详情页',
        hidden: true,
        component: () => import('@/views/purchase/purchaseDetails/index'),
        meta: { title: '订单详情页', icon: '' }
      },
      {
        path: 'deliver',
        name: '发货单详情',
        hidden: true,
        component: () => import('@/views/purchase/deliver/index'),
        meta: { title: '发货单详情', icon: '' }
      },
      {
        path: 'acceptance',
        name: 'orderIndex',
        component: () => import('@/views/purchase/acceptance/table/index'),
        hasPermi: ['xm:menu:bs:material:purchase_manage:acceptance:receipt_list:query', 'xm:menu:bs:material:purchase_manage:acceptance:return_list:query'],
        meta: { title: '物资验收管理', icon: '' }
      },
      {
        path: 'receipt',
        name: '录入收料信息',
        hidden: true,
        component: () => import('@/views/purchase/acceptance/receipt/index'),
        meta: { title: '录入收料信息', icon: '' }
      },
      {
        path: 'checkReceipt',
        name: '查看收料信息',
        hidden: true,
        component: () => import('@/views/purchase/acceptance/checkReceipt/index'),
        meta: { title: '查看收料信息', icon: '' }
      },
      {
        path: 'retreat',
        name: '填写退换货单据',
        hidden: true,
        component: () => import('@/views/purchase/acceptance/retreat/index'),
        meta: { title: '填写退换货单据', icon: '' }
      },
      {
        path: 'checkAlteration',
        name: '查看变更信息',
        hidden: true,
        component: () => import('@/views/purchase/acceptance/checkAlteration/index'),
        meta: { title: '查看变更信息', icon: '' }
      },
      {
        path: 'details',
        name: '详情',
        hidden: true,
        component: () => import('@/views/purchase/acceptance/details/index'),
        meta: { title: '详情', icon: '' }
      },
      {
        path: 'examine',
        name: '审批详情',
        hidden: true,
        component: () => import('@/views/purchase/acceptance/examine/index'),
        meta: { title: '审批详情', icon: '' }
      }
    ]
  }
]
