import Layout from '$components/layout';

const home = [{
  path: '/',
  component: Layout,
  redirect: 'home',
  children: [{
    path: 'home',
    component: () => import('@/views/home/index'),
    name: 'Home',
    meta: {
      title: 'home/首页',
      icon: 'home',
      affix: true
    }
  }]
}];

export default home;
