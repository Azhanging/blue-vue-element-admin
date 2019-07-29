import $axios from '$axios';
import router from '@router';
import { setLoginStorage, clearLoginStorage } from '$assets/js/login';
import { getUserInfo } from '$assets/js/user';
import { Message } from 'element-ui';

//登录
export function apiLoginIn(data) {
  return $axios({
    url: '/mock/login/in',
    method: 'post',
    data
  }).then((res) => {
    const { data } = res;
    //登录态存储
    setLoginStorage(data);
    //获取用户信息
    getUserInfo();

    Message({
      message: `登录成功`,
      type: 'success'
    });
    return data;
  });
}

//登出
export function apiLoginOut() {
  return $axios({
    url: '/mock/login/out',
    type: 'get'
  }).then(() => {
    clearLoginStorage();
    Message({
      message: `退出成功`,
      type: 'success'
    });
    router.push(`/login?redirect=${router.currentRoute.fullPath}`);
  });
}