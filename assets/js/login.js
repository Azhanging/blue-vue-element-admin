import router from '@router';
import config from '@config';
import utils from 'blue-utils';
import { Message } from "element-ui";

//处理老登录业务
export function routerToLogin() {
  //token方案
  router.replace(config.path.login);
}

//未登录
export function unLogin() {
  //跳转到登录
  routerToLogin();
  Message({
    message: '跳转登录中...',
    duration: 60000
  });
}

//登录成功或的跳转
export function loginSuccessRouterTo(path) {
  const currentRoute = router.currentRoute;
  let queryUrl = currentRoute.query['url'];
  if (queryUrl) {
    queryUrl = decodeURIComponent(queryUrl);
  }
  //参数path -> url query -> indexPath
  location.href = path || queryUrl || config.path.indexPath;
}

//登录超时
export function loginExpire() {
  if (config.login.mode === 'token') {
    clearLoginStorage();
  }
  routerToLogin();
}

//设置登录状态到本地存储
export function setLoginStorage(data) {
  utils.each(config.login.storage, (key) => {
    (key in data) && localStorage.setItem(key, data[key]);
  });
}

//删除登录态
export function clearLoginStorage() {
  utils.each(config.login.storage, (key) => {
    localStorage.removeItem(key);
  });
}

//获取token
export function getToken() {
  const token = {};
  utils.each(config.login.storage, (key) => {
    const getItem = localStorage.getItem(key);
    if(getItem){
      token[key] = getItem;
    }
  });
  return token;
}

//对比两个storage是否一致
export function hasToken() {
  return utils.getObjLen(getToken()) === utils.getObjLen(config.login.storage);
}