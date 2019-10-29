const errorPage = [{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
}, {
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
}];

export default errorPage;
