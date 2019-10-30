import Layout from '$components/Layout';

const resource = [{
  path: '/resource',
  component: Layout,
  redirect: 'resource',
  children: [{
    path: 'resource',
    component: () => import('@/views/resource/index'),
    meta: {
      icon: 'el-icon-folder',
      title: '资源列表'
    }
  }, {
    path: 'add',
    component: () => import('@/views/resource/add'),
    meta: {
      icon: 'el-icon-folder',
      title: '添加资源'
    }
  }]
}];

export default resource;
