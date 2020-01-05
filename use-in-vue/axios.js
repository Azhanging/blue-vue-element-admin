import axios from 'axios'
import config from '@config';
import utils from 'blue-utils';
import router, { routerMeta } from '@router';
import { Message } from 'element-ui'
import code from '$code/code';    //错误码
import { codeHandler } from '$code';   //错误码处理
import { redirect } from '$assets/js/redirect';
import { showLoading, hideLoading } from '$use-in-vue/element-ui/loading';

// create an axios instance
const $axios = axios.create({
  baseURL: '/api/admin',
  timeout: config.axios.timeout
});

// request interceptor
$axios.interceptors.request.use((axiosConfig) => {
  //把路由当前路由的id设置给axios config中
  axiosConfig.routeID = routerMeta.getCurrentRouterID();
  const isShowLoading = axiosConfig.isShowLoading;
  setHeaderToken(axiosConfig);
  //是否loading显示
  if (isShowLoading === undefined || isShowLoading === true) {
    //设置当前的loading的id
    showLoading();
  }
  return axiosConfig;
}, (error) => {
  hideLoading();
  return Promise.reject(error)
});

// response interceptor
$axios.interceptors.response.use((res) => {
  const status = res.status;
  const axiosConfig = res.config;
  const isShowLoading = axiosConfig.isShowLoading;
  if (isShowLoading === undefined || isShowLoading === true) {
    hideLoading();
  }
  if (status === 200) {
    const { code: requestCode, message } = res.data;
    //success code
    if (requestCode === code.SUCCESS) {
      message && Message({
        message,
        type: 'success'
      });
      return res.data;
    } else if (requestCode === code.REDIRECT) {    //作为重定向跳转
      let redirectTime = 0;
      //存在重定向信息
      if (message) {
        Message({
          message
        });
        redirectTime = 1000;
      }
      setTimeout(() => {
        redirect(res.data);
      }, redirectTime);
    } else {
      //code处理
      codeHandler(res.data);
      //避免原来then上的业务，走reject
      return Promise.reject(res.data);
    }
  }
}, (error) => {
  const axiosConfig = error.config;
  const isTimeout = /timeout/ig.test(error.message);
  const status = isTimeout ? 'timeout' : (error.response ? error.response.status : 400);
  const errorConfig = config.error;
  hideLoading();

  //检查当前的路由标识和当前路由中的id标识是否一样
  //不一样不去执行后面异步的操作
  if (!routerMeta.isCurrentRouteID(axiosConfig.routeID)) {
    return Promise.reject(error);
  }

  //处理超时信息，重写信息,只有超时有提示
  if (isTimeout) {
    error.message = '请求超时，请刷新页面';
    Message({
      message: error.message,
      type: 'error',
      duration: 1500
    });
  }

  //跳转指定的错误状态页
  if (status >= 400 && status < 600 && !config.debug) {
    const errorPath = errorConfig[status] ? errorConfig[status].path : errorConfig[404].path;
    router.push(errorPath);
  }

  return Promise.reject(error);
});

//设置header中的token
function setHeaderToken(axiosConfig) {
  const { headers } = axiosConfig;
  utils.each(config.login.storage, (key) => {
    const getItem = window.localStorage.getItem(key) || window.sessionStorage.getItem(key);
    if (getItem) {
      headers[key] = getItem;
    }
  });
}

export default $axios;
