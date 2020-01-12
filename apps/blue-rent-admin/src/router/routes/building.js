const building = [{
  path: `/building`,
  component: () => import('$components/Layout'),
  redirect: 'list',
  meta: {
    title: '楼'
  },
  children: [{
    path: 'list',
    name: 'building-list',
    component: () => import('@/views/building/List'),
    meta: {
      title: '楼'
    }
  }, {
    path: 'info',
    name: 'building-info',
    component: () => import('@/views/building/Info'),
    hidden: true,
    meta: {
      title: '楼详情'
    }
  }]
}];

export default building;
