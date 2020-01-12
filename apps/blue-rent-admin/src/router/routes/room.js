const room = [{
  path: `/room`,
  component: () => import('$components/Layout'),
  redirect: 'list',
  meta: {
    title: '房间'
  },
  children: [{
    path: 'list',
    name: 'room-list',
    component: () => import('@/views/room/List'),
    meta: {
      title: '房间'
    }
  }, {
    path: 'info',
    name: 'room-info',
    component: () => import('@/views/room/Info'),
    hidden: true,
    meta: {
      title: '房间详情'
    }
  }]
}];

export default room;
