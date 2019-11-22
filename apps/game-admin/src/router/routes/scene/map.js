import Layout from '$components/Layout';

const map = [{
  path: '/map',
  component: () => import('$components/SpaceLayout.vue'),
  redirect: 'list',
  meta: {
    title: '地图'
  },
  children: [{
    name: 'mapList',
    path: 'list',
    component: () => import('@/views/scene/map/list'),
    meta: {
      title: '地图'
    }
  }, {
    name: 'mapDetail',
    path: 'detail',
    component: () => import('@/views/scene/map/detail'),
    hidden: true,
    meta: {
      title: '地图管理'
    }
  }]
}];

export default map;
