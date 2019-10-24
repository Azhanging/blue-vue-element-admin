import config from '@config';
import manager from "./manager";

const hasDemo = config.view.hasDemo;

let routes = [
  ...manager    //manager->(login|register)
];

//是否显示demo的东西
if (process.env.NODE_ENV === 'development' && hasDemo) {
  const demoRoutes = require(`$demo/router/routes`).default;
  routes = [].concat(routes, demoRoutes);
}

export default routes;
