import Layout from '@/layout'

export default [
  {
    path: '/purchaseAssets',
    component: Layout,
    redirect: '/purchaseAssets/index',
    name: '采购订单管理',
    hasPermi: [],
    haveMenuModule: 'asset',
    meta: {
      title: '采购订单管理',
      icon: 'purchase'
    },
    children: [
      {
        path: 'index',
        name: 'PurchaseAssetsIndex',
        component: () => import('@/views/purchaseAssets/index'),
        hasPermi: [''],
        meta: { title: '采购订单管理', icon: '' }
      },
      {
        path: 'placeOrder',
        name: 'PlaceOrderAssets',
        hidden: true,
        component: () => import('@/views/purchaseAssets/placeOrder'),
        meta: { title: '下采购订单', icon: '' }
      },
      {
        path: 'deliver',
        name: 'DeliverAssets',
        hidden: true,
        component: () => import('@/views/purchaseAssets/deliver'),
        meta: { title: '发货单详情', icon: '' }
      },
      {
        path: 'purchaseDetails',
        name: 'PurchaseDetailsAssets',
        hidden: true,
        component: () => import('@/views/purchaseAssets/purchaseDetails'),
        meta: { title: '订单详情页', icon: '' }
      }
    ]
  },
  {
    path: '/acceptanceAssets',
    component: Layout,
    redirect: '/acceptanceAssets/index',
    name: '资产验收管理',
    hasPermi: [],
    haveMenuModule: 'asset',
    meta: {
      title: '资产验收管理',
      icon: 'acceptance'
    },
    children: [
      {
        path: 'index',
        name: 'AcceptanceAssetsIndex',
        component: () => import('@/views/acceptanceAssets/index'),
        hasPermi: [''],
        meta: { title: '资产验收管理', icon: '' }
      },
      {
        path: 'retreat',
        name: 'RetreatIndexAssets',
        hidden: true,
        component: () => import('@/views/acceptanceAssets/retreat/index'),
        meta: { title: '填写退换货单据', icon: '' }
      },
      {
        path: 'checkAlteration',
        name: 'CheckAlterationAssets',
        hidden: true,
        component: () => import('@/views/acceptanceAssets/checkAlteration'),
        meta: { title: '查看变更信息', icon: '' }
      },
      {
        path: 'checkReceipt',
        name: 'CheckReceiptAssets',
        hidden: true,
        component: () => import('@/views/acceptanceAssets/checkReceipt'),
        meta: { title: '查看收货信息', icon: '' }
      },
      {
        path: 'receipt',
        name: 'ReceiptAssets',
        hidden: true,
        component: () => import('@/views/acceptanceAssets/receipt'),
        meta: { title: '编辑收货信息', icon: '' }
      },
      {
        path: 'details',
        name: 'DetailsAssets',
        hidden: true,
        component: () => import('@/views/acceptanceAssets/details'),
        meta: { title: '查看退换货信息', icon: '' }
      }
    ]
  }
]
