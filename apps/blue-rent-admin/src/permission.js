import router from './router';
import config from '@config';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import { hasToken, routerToLogin } from '$assets/js/login';
import { hideLoading } from '$use-in-vue/element-ui/loading';

router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = to.meta.title || config.view.title;
  const routesWhiteList = config.role.routesWhiteList;
  //是否有token
  if (hasToken()) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' });
      NProgress.done();
    } else {
      next();
    }
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`${config.path.login}?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
  hideLoading();
});
