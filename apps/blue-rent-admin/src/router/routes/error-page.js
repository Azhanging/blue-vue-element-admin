const errorPage = [{
  path: '/404',
  component: () => import('$components/ErrorPage/404'),
  hidden: true
}, {
  path: '/401',
  component: () => import('$components/ErrorPage/401'),
  hidden: true
}];

export default errorPage;
