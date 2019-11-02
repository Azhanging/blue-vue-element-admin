import Layout from '$components/Layout';

const map = [{
  path: '/map',
  component: Layout,
  redirect: 'list',
  meta: {
    title: '地图'
  },
  children: [{
    path: 'list',
    component: () => import('@/views/map'),
    meta: {
      title: '地图列表',
      affix: true
    }
  }]
}];

export default map;
