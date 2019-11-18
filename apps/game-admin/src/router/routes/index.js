import config from '@config';
import home from "./home";
import configRouter from './config';
import map from "./map";
import resource from "./resource";
import npc from "./npc";
import monster from "./monster";
import task from "./task";
import manage from "./manage";
import occupation from "./occupation";
import errorPage from "./error-page";

const hasDemo = config.view.hasDemo;

//项目路由
let routes = [
    ...manage,
    ...home,
    ...configRouter,
    ...resource,
    ...npc,
    ...monster,
    ...task,
    ...map,
    ...occupation,
    ...errorPage
  ]
;

//是否显示demo的东西
if (process.env.NODE_ENV === 'development' && hasDemo) {
  const demoRoutes = require(`$demo/router/routes`).default;
  routes = [].concat(routes, demoRoutes);
}

export default routes;
