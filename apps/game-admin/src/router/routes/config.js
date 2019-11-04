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
    component: () => import('@/views/config/list'),
    meta: {
      title: '配置列表',
      affix: true
    }
  }, {
    name: 'configDetail',
    path: 'detail',
    hidden: true,
    component: () => import('@/views/config/detail'),
    meta: {
      title: '配置管理',
      affix: true
    }
  }]
}];

export default config;
