import Layout from '$components/Layout';

const map = [{
  path: '/map',
  component: Layout,
  redirect: 'map',
  children: [{
    path: 'map',
    component: () => import('@/views/map'),
    meta: {
      title: '地图',
      icon: 'el-icon-map',
      affix: true
    }
  }]
}];

export default map;
