import Layout from '@/layout'
export default [
  {
    path: '/plan',
    component: Layout,
    redirect: '/plan/totalPlan',
    name: '计划管理',
    hasPermi: ['xm:menu:bs:material:plan_manage:master_plan:query', 'xm:menu:bs:material:plan_manage:monthly_plan:query', 'xm:menu:bs:material:plan_manage:demand_plan:query'],
    haveMenuModule: 'material',
    alwaysShow: true,
    meta: {
      title: '计划管理',
      icon: 'plan'
    },
    children: [
      {
        path: 'totalPlan',
        component: () => import('@/views/plan/totalPlan/index'),
        hasPermi: 'xm:menu:bs:material:plan_manage:master_plan:query',
        name: '总计划',
        meta: {
          title: '总计划',
          keepAlive: true
        }
      },
      {
        path: 'approveDetail',
        component: () => import('@/views/plan/components/approveDetail'),
        hasPermi: 'plan:overall:list',
        hidden: true,
        name: '审批详情',
        meta: {
          title: '审批详情'
        }
      },
      {
        path: 'materialsNeeded',
        component: () => import('@/views/plan/totalPlan/addPlan/index'),
        name: '物资需用总计划配置',
        hidden: true,
        meta: {
          title: '物资需用总计划配置'
        }
      },
      {
        path: 'concreteNeeded',
        component: () => import('@/views/plan/totalPlan/addPlan/index'),
        name: '混凝土需用总计划模板配置',
        hidden: true,
        meta: {
          title: '混凝土需用总计划模板配置'
        }
      },
      {
        path: 'returnableNeeded',
        component: () =>
          import('@/views/plan/totalPlan/addPlan/index'),
        name: '周转料具需用总计划配置',
        hidden: true,
        meta: {
          title: '周转料具需用总计划配置'
        }
      },
      {
        path: 'reinforcedNeeded',
        component: () =>
          import('@/views/plan/totalPlan/addReinforcedPlan/index'),
        name: '钢筋需用总计划配置',
        hidden: true,
        meta: {
          title: '钢筋需用总计划配置'
        }
      },
      {
        path: 'materialsNeededChange',
        component: () => import('@/views/plan/totalPlan/changePlan/index'),
        name: '物资需用总计划配置',
        hidden: true,
        meta: {
          title: '物资需用总计划配置'
        }
      },
      {
        path: 'concreteNeededChange',
        component: () => import('@/views/plan/totalPlan/changePlan/index'),
        name: '混凝土需用总计划模板配置',
        hidden: true,
        meta: {
          title: '混凝土需用总计划模板配置'
        }
      },
      {
        path: 'returnableNeededChange',
        component: () =>
          import('@/views/plan/totalPlan/changePlan/index'),
        name: '周转料具需用总计划配置',
        hidden: true,
        meta: {
          title: '周转料具需用总计划配置'
        }
      },
      {
        path: 'reinforcedNeededChange',
        component: () =>
          import('@/views/plan/totalPlan/changePlan/index'),
        name: '钢筋需用总计划配置',
        hidden: true,
        meta: {
          title: '钢筋需用总计划配置'
        }
      },
      {
        path: 'materialsTotalPlanDetails',
        component: () => import('@/views/plan/totalPlan/totalPlanDetails/index'),
        name: '物资需用总计划详情',
        hidden: true,
        meta: {
          title: '物资需用总计划详情'
        }
      },
      {
        path: 'reinforcedTotalPlanDetails',
        component: () => import('@/views/plan/totalPlan/totalPlanDetails/index'),
        name: '钢筋需用总计划详情',
        hidden: true,
        meta: {
          title: '钢筋需用总计划详情'
        }
      },
      {
        path: 'concreteTotalPlanDetails',
        component: () => import('@/views/plan/totalPlan/totalPlanDetails/index'),
        name: '混凝土需用总计划详情',
        hidden: true,
        meta: {
          title: '混凝土需用总计划详情'
        }
      },
      {
        path: 'returnableTotalPlanDetails',
        component: () => import('@/views/plan/totalPlan/totalPlanDetails/index'),
        name: '周转料具需用总计划详情',
        hidden: true,
        meta: {
          title: '周转料具需用总计划详情'
        }
      },
      {
        path: 'monthlyPlan',
        component: () => import('@/views/plan/monthlyPlan/index'),
        name: '月度计划',
        hasPermi: 'xm:menu:bs:material:plan_manage:monthly_plan:query',
        meta: {
          title: '月度计划',
          keepAlive: true
        }
      },
      {
        path: 'addMonthlyPlan',
        component: () => import('@/views/plan/monthlyPlan/addMonthlyPlan'),
        name: '物资月度需用计划配置',
        hidden: true,
        meta: {
          title: '物资月度需用计划配置'
        }
      },
      {
        path: 'editMonthlyPlan',
        component: () => import('@/views/plan/monthlyPlan/addMonthlyPlan'),
        name: '物资月度需用计划配置',
        hidden: true,
        meta: {
          title: '物资月度需用计划配置'
        }
      },
      {
        path: 'monthlyPlanDetail',
        component: () => import('@/views/plan/monthlyPlan/monthlyPlanDetail'),
        name: '物资月度需用计划表',
        hidden: true,
        meta: {
          title: '物资月度需用计划表'
        }
      },
      {
        path: 'needPlan',
        component: () => import('@/views/plan/needPlan/index'),
        name: '需用计划',
        hasPermi: 'xm:menu:bs:material:plan_manage:demand_plan:query',
        meta: {
          title: '需用计划',
          keepAlive: true
        }
      },
      {
        path: 'suppliesNeedPlan',
        component: () => import('@/views/plan/needPlan/publicNeedPlan/index'),
        name: '物资需用计划配置',
        hidden: true,
        meta: {
          title: '物资需用计划配置'
        }
      },
      {
        path: 'suppliesNeedNoPlan',
        component: () => import('@/views/plan/needPlan/printComponentNoPlan/index'),
        name: '物资需用计划配置',
        hidden: true,
        meta: {
          title: '物资需用计划配置'
        }
      },
      {
        path: 'concreteNeedPlan',
        component: () => import('@/views/plan/needPlan/concreteNeedPlan/index'),
        name: '需用计划配置',
        hidden: true,
        meta: {
          title: '需用计划配置'
        }
      },
      {
        path: 'needPlanDetail',
        component: () => import('@/views/plan/needPlan/needPlanDetail/index'),
        name: '需用计划详情',
        hidden: true,
        meta: {
          title: '需用计划详情'
        }
      }
    ]
  }
]
