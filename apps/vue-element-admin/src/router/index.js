import Vue from 'vue';
import Router from 'vue-router';
import routes from "./routes";

import RouterID from '$use-in-vue-router/router-id';

Vue.use(Router);

//路由标记
export const routerID = new RouterID();

const createRouter = () => new Router({
  routes: routerID.addID(routes),
  scrollBehavior: () => ({ y: 0 })
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
