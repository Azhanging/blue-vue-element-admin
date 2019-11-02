import Layout from '$components/Layout';

const config = [{
  path: '/config',
  component: Layout,
  redirect: 'list',
  meta:{
    title: '配置',
  },
  children: [{
    name: 'configList',
    path: 'list',
    component: () => import('@/views/config'),
    meta: {
      title: '配置列表',
      affix: true
    }
  }, {
    name: 'configAdd',
    path: 'add',
    component: () => import('@/views/config/add'),
    meta: {
      title: '添加配置',
      affix: true
    }
  }]
}];

export default config;
