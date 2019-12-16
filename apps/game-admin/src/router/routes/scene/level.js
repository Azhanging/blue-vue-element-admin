const level = [{
  path: '/level',
  component: () => import('$components/SpaceLayout.vue'),
  redirect: 'list',
  meta: {
    title: '等级'
  },
  children: [{
    name: 'levelList',
    path: 'list',
    component: () => import('@/views/scene/level/Index'),
    meta: {
      title: '等级'
    }
  }]
}];

export default level;
