import Layout from '@/layout'
export default [
  {
    path: '/contractManagement',
    component: Layout,
    redirect: '/contractManagement/table',
    name: '合同管理',
    hasPermi: ['xm:menu:bs:material:contract_manage:list:query', 'xm:menu:bs:material:contract_manage:enforce:query'],
    haveMenuModule: 'material',
    meta: {
      title: '合同管理',
      icon: 'contractManagement'
    },
    children: [
      {
        path: 'table',
        name: '合同列表',
        component: () => import('@/views/contractManagement/table/index'),
        hasPermi: 'xm:menu:bs:material:contract_manage:list:query',
        meta: { title: '合同列表', icon: '' }
      },
      {
        path: 'add',
        name: '新增合同',
        hidden: true,
        component: () => import('@/views/contractManagement/add/index'),
        meta: { title: '新增合同', icon: '' }
      },
      {
        path: 'edit',
        name: '编辑合同',
        hidden: true,
        component: () => import('@/views/contractManagement/edit/index'),
        meta: { title: '编辑合同', icon: '' }
      },
      {
        path: 'alteration',
        name: '变更合同',
        hidden: true,
        component: () => import('@/views/contractManagement/alteration/index'),
        meta: { title: '变更合同', icon: '' }
      },
      {
        path: 'changeDetails',
        name: '合同变更详情',
        hidden: true,
        component: () =>
          import('@/views/contractManagement/changeDetails/index'),
        meta: { title: '合同变更详情', icon: '' }
      },
      {
        path: 'relevance',
        name: '关联项目',
        hidden: true,
        component: () =>
          import('@/views/contractManagement/relevance/index'),
        meta: { title: '关联项目', icon: '' }
      },
      {
        path: 'more',
        name: '选择项目',
        hidden: true,
        component: () =>
          import('@/views/contractManagement/more/indexDialog'),
        meta: { title: '选择项目', icon: '' }
      },
      {
        path: 'contractDetails',
        name: '合同详情',
        hidden: true,
        component: () =>
          import('@/views/contractManagement/contractDetails/index'),
        meta: { title: '合同详情', icon: '' }
      },
      {
        path: 'execute',
        name: '合同执行',
        component: () =>
          import('@/views/contractManagement/execute/table/index'),
        hasPermi: 'xm:menu:bs:material:contract_manage:enforce:query',
        meta: { title: '合同执行', icon: '' }
      },
      {
        path: 'contractDetail',
        name: '合同详情',
        hidden: true,
        component: () =>
          import('@/views/contractManagement/execute/contractDetail/index'),
        meta: { title: '合同详情', icon: '' }
      },
      {
        path: 'alterations',
        name: '合同变更',
        hidden: true,
        component: () =>
          import('@/views/contractManagement/execute/alterations/index'),
        meta: { title: '合同变更', icon: '' }
      },
      {
        path: 'changeDetail',
        name: '合同变更详情',
        hidden: true,
        component: () =>
          import('@/views/contractManagement/execute/changeDetail/index'),
        meta: { title: '合同变更详情', icon: '' }
      }
    ]
  }
]
