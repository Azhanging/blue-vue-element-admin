import Layout from '$components/Layout';

const resource = [{
  path: '/resource',
  component: Layout,
  redirect: 'resource',
  children: [{
    path: 'resource',
    component: () => import('@/views/resource'),
    meta: {
      icon: 'el-icon-folder',
      title: '资源'
    }
  }]
}];

export default resource;
