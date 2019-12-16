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
    component: () => import('@/views/scene/occupation/List'),
    meta: {
      title: '职业'
    }
  }, {
    name: 'occupationDetail',
    path: 'detail',
    component: () => import('@/views/scene/occupation/Detail'),
    hidden: true,
    meta: {
      title: '添加职业'
    }
  }]
}];

export default occupation;
