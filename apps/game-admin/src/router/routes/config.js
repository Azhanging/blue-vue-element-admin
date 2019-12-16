import Layout from '$components/Layout';

const config = [{
  path: '/config',
  component: Layout,
  redirect: 'list',
  meta: {
    title: '配置',
  },
  children: [{
    name: 'configList',
    path: 'list',
    component: () => import('@/views/config/Index'),
    meta: {
      title: '配置'
    }
  }, {
    name: 'configDetail',
    path: 'detail',
    hidden: true,
    component: () => import('@/views/config/Detail'),
    meta: {
      title: '配置管理'
    }
  }]
}];

export default config;
