import Layout from '@/layout'
export default [
  {
    path: '/workbench/todo',
    component: Layout,
    redirect: '/workbench/todo/index',
    haveMenuModule: 'workbench',
    hasPermi: ['xm:menu:wp:todo_center:todo:query',
      'xm:menu:wp:todo_center:todo:approve',
      'xm:menu:wp:todo_center:todo:edit',
      'xm:menu:wp:todo_center:done:query',
      'xm:menu:wp:todo_center:my_apply:query',
      'xm:menu:wp:todo_center:my_apply:withdraw'
    ],
    children: [
      {
        path: 'index',
        hasPermi: ['xm:menu:wp:todo_center'],
        component: () => import('@/views/workbench/taskCenter/index'),
        meta: {
          title: '待办中心',
          icon: 'todo',
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/workbench/todo/approvalDetail',
    component: Layout,
    redirect: '/workbench/todo/approvalDetail/index',
    haveMenuModule: 'workbench',
    hasPermi: ['xm:menu:wp:todo_center:todo:query',
      'xm:menu:wp:todo_center:todo:approve',
      'xm:menu:wp:todo_center:todo:edit',
      'xm:menu:wp:todo_center:done:query',
      'xm:menu:wp:todo_center:my_apply:query',
      'xm:menu:wp:todo_center:my_apply:withdraw'
    ],
    hidden: true,
    meta: {
      title: '待办中心'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/workbench/taskCenter/approvalDetail'),
        meta: {
          title: '业务审批',
          icon: 'todo'
        }
      }
    ]
  },
  {
    path: '/workbench/message',
    component: Layout,
    hasPermi: ['xm:menu:wp:message_center'],
    haveMenuModule: 'workbench',
    children: [
      {
        path: 'index',
        component: () => import('@/views/workbench/messageCenter/index'),
        meta: {
          title: '消息中心',
          icon: 'message'
        }
      }
    ]
  },
  {
    path: '/workbench/personal',
    component: Layout,
    haveMenuModule: 'workbench',
    children: [
      {
        path: 'index',
        component: () => import('@/views/workbench/personalCenter/personal'),
        meta: {
          title: '个人中心',
          icon: 'personal'
        }
      }
    ]
  }
]
