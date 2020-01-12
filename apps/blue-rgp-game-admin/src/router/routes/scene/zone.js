const zone = [{
  path: '/zone',
  component: () => import('$components/SpaceLayout.vue'),
  redirect: 'list',
  meta: {
    title: '区域'
  },
  children: [{
    name: 'mapList',
    path: 'list',
    component: () => import('@/views/scene/zone/List'),
    meta: {
      title: '区域'
    }
  }, {
    name: 'mapInfo',
    path: 'info',
    component: () => import('@/views/scene/zone/Info'),
    hidden: true,
    meta: {
      title: '区域管理'
    }
  }]
}];

export default zone;
