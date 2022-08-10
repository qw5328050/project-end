import Layout from '@/layout'

export default [
  {
    path: '/accountAssets',
    component: Layout,
    redirect: '/accountAssets/index',
    name: '资产台账',
    hasPermi: [],
    haveMenuModule: 'asset',
    meta: {
      title: '资产台账',
      icon: 'purchase'
    },
    children: [
      {
        path: 'index',
        name: 'accountAssets',
        component: () => import('@/views/accountAssets/index'),
        hasPermi: [''],
        meta: { title: '资产台账', icon: '' }
      }
    ]
  }
]
