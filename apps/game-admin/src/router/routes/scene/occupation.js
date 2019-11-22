import Layout from '$components/Layout';

const occupation = [{
  path: '/occupation',
  component: () => import('$components/SpaceLayout.vue'),
  redirect: 'list',
  meta: {
    title: '职业'
  },
  children: [{
    name: 'occupationList',
    path: 'list',
    component: () => import('@/views/scene/occupation/list'),
    meta: {
      title: '职业'
    }
  }, {
    name: 'occupationDetail',
    path: 'detail',
    component: () => import('@/views/scene/occupation/detail'),
    hidden: true,
    meta: {
      title: '添加职业'
    }
  }]
}];

export default occupation;
