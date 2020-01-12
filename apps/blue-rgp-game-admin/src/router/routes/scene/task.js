import Layout from '$components/Layout';

const resource = [{
  path: '/task',
  component: () => import('$components/SpaceLayout.vue'),
  redirect: 'list',
  meta: {
    title: '任务'
  },
  children: [{
    name: 'taskList',
    path: 'list',
    component: () => import('@/views/scene/task/List'),
    meta: {
      title: '任务'
    }
  }, {
    name: 'taskDetail',
    path: 'info',
    component: () => import('@/views/scene/task/Info'),
    hidden: true,
    meta: {
      title: '添加任务'
    }
  }]
}];

export default resource;
