import Layout from '@/layout'
export default [
  {
    path: '/materialsSiteManagement',
    component: Layout,
    redirect: 'inventoryList',
    name: '物资现场管理',
    hasPermi: ['xm:menu:bs:material:contract_manage:list:query', 'xm:menu:bs:material:contract_manage:enforce:query'],
    haveMenuModule: 'material',
    meta: {
      title: '物资现场管理',
      icon: 'contractManagement'
    },
    children: [
      {
        path: 'inventoryList',
        name: '物资盘点管理',
        component: () => import('@/views/materialsSiteManagement/inventory/list/index'),
        hasPermi: 'xm:menu:bs:material:contract_manage:list:query',
        meta: { title: '物资盘点管理', icon: '' }
      },
      {
        path: 'costManagement',
        name: '成本管理',
        component: () => import('@/views/materialsSiteManagement/costManagement/index'),
        hasPermi: 'xm:menu:bs:material:contract_manage:list:query',
        meta: { title: '成本管理', icon: '' }
      },
      {
        path: '/costManagement/add',
        name: '新增节超分析表-混凝土分部分项浇筑统计',
        hidden: true,
        component: () => import('@/views/materialsSiteManagement/costManagement/add'),
        hasPermi: 'xm:menu:bs:material:contract_manage:list:query',
        meta: { title: '新增节超分析表-混凝土分部分项浇筑统计', icon: '' }
      },
      {
        path: 'planAdd',
        name: '新增物资盘点计划',
        hidden: true,
        component: () => import('@/views/materialsSiteManagement/inventory/plan/add'),
        hasPermi: 'xm:menu:bs:material:contract_manage:list:query',
        meta: { title: '新增物资盘点计划', icon: '' }
      }, {
        path: 'recordAdd',
        name: '新增物资盘点记录',
        hidden: true,
        component: () => import('@/views/materialsSiteManagement/inventory/record/add'),
        hasPermi: 'xm:menu:bs:material:contract_manage:list:query',
        meta: { title: '新增物资盘点记录', icon: '' }
      }, {
        path: 'analysisAdd',
        name: '编辑物资盘点分析',
        hidden: true,
        component: () => import('@/views/materialsSiteManagement/inventory/analysis/add'),
        hasPermi: 'xm:menu:bs:material:contract_manage:list:query',
        meta: { title: '编辑物资盘点分析', icon: '' }
      }, {
        path: 'analysisDetails',
        name: '物资盘点分析详情',
        hidden: true,
        component: () => import('@/views/materialsSiteManagement/inventory/analysis/details'),
        hasPermi: 'xm:menu:bs:material:contract_manage:list:query',
        meta: { title: '物资盘点分析详情', icon: '' }
      }, {
        path: 'planDetails',
        name: '物资盘点计划详情',
        hidden: true,
        component: () => import('@/views/materialsSiteManagement/inventory/plan/details'),
        hasPermi: 'xm:menu:bs:material:contract_manage:list:query',
        meta: { title: '物资盘点计划详情', icon: '' }
      },
      {
        path: 'patrolList',
        name: '日常巡检管理',
        component: () => import('@/views/materialsSiteManagement/patrol/list/index'),
        hasPermi: 'xm:menu:bs:material:contract_manage:list:query',
        meta: { title: '日常巡检管理', icon: '' }
      },
      {
        path: 'abarbeitungDetails',
        name: '整改单据详情',
        component: () => import('@/views/materialsSiteManagement/patrol/abarbeitung/details'),
        hidden: true,
        meta: { title: '整改单据详情', icon: '' }
      },
      {
        path: 'abarbeitungVerify',
        name: '整改结果验证',
        component: () => import('@/views/materialsSiteManagement/patrol/abarbeitung/verify'),
        hidden: true,
        meta: { title: '整改结果验证', icon: '' }
      },
      {
        path: 'abarbeitungAdd',
        name: '新增整改单据',
        component: () => import('@/views/materialsSiteManagement/patrol/abarbeitung/add'),
        hidden: true,
        meta: { title: '新增整改单据', icon: '' }
      },
      {
        path: 'compensationAdd',
        name: '新增索赔单据',
        hidden: true,
        component: () => import('@/views/materialsSiteManagement/patrol/compensation/add'),
        hasPermi: 'xm:menu:bs:material:contract_manage:list:query',
        meta: { title: '新增索赔单据', icon: '' }
      },
      {
        path: 'compensationDetails',
        name: '索赔单据详情',
        hidden: true,
        component: () => import('@/views/materialsSiteManagement/patrol/compensation/details'),
        hasPermi: 'xm:menu:bs:material:contract_manage:list:query',
        meta: { title: '索赔单据详情', icon: '' }
      },
    ]
  }
]
