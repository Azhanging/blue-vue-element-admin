import Layout from '$components/Layout';

const resource = [{
  path: '/task',
  component: Layout,
  redirect: 'list',
  meta: {
    title: '任务'
  },
  children: [{
    name: 'taskList',
    path: 'list',
    component: () => import('@/views/task/list'),
    meta: {
      title: '任务'
    }
  }, {
    name: 'taskDetail',
    path: 'detail',
    component: () => import('@/views/task/detail'),
    hidden: true,
    meta: {
      title: '添加任务'
    }
  }]
}];

export default resource;
