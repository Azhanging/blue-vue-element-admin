import Layout from '$components/Layout';

const resource = [{
  path: '/resource',
  component: Layout,
  redirect: 'list',
  meta: {
    title: '资源'
  },
  children: [{
    name: 'resourceList',
    path: 'list',
    component: () => import('@/views/resource/list'),
    meta: {
      title: '资源管理'
    }
  }, {
    name: 'resourceDetail',
    path: 'detail',
    component: () => import('@/views/resource/detail'),
    hidden: true,
    meta: {
      title: '添加资源'
    }
  }]
}];

export default resource;
