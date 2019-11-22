import Layout from '$components/Layout';

const resource = [{
  path: 'resource',
  component: () => import('$components/SpaceLayout.vue'),
  redirect: 'list',
  meta: {
    title: '资源'
  },
  children: [{
    name: 'resourceList',
    path: 'list',
    component: () => import('@/views/scene/resource/list'),
    meta: {
      title: '资源'
    }
  }, {
    name: 'resourceDetail',
    path: 'detail',
    component: () => import('@/views/scene/resource/detail'),
    hidden: true,
    meta: {
      title: '添加资源'
    }
  }]
}];

export default resource;
