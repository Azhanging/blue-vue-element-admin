import Vue from 'vue';
import Router from 'vue-router';
import routes from "./routes";

import RouterMeta from '$use-in-vue-router/router-meta';

Vue.use(Router);

//路由标记
export const routerMeta = new RouterMeta();

const createRouter = () => new Router({
  routes: routerMeta.setMeta(routes),
  mode: 'history',
  scrollBehavior: () => ({ y: 0 })
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
