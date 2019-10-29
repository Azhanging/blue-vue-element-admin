import Layout from '$components/Layout';

const home = [{
  path: '/',
  component: Layout,
  redirect: 'home',
  children: [{
    path: 'home',
    component: () => import('@/views/home/index'),
    meta: {
      title: '首页',
      icon: 'el-icon-home',
      affix: true
    }
  }]
}];

export default home;
