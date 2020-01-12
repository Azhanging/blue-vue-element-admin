import Layout from '$components/Layout';

const home = [{
  path: '/',
  component: Layout,
  redirect: 'home',
  children: [{
    name: 'Home',
    path: 'home',
    component: () => import('@/views/home/Index'),
    meta: {
      title: '首页',
      affix: true
    }
  }]
}];

export default home;
