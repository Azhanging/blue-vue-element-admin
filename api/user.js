import $axios from '$axios';
import config from '@config';
import store from '@store';

//获取用户信息
export function apiGetUserInfo() {
  return $axios.get(config.user.url).then((res) => {
    //设置userInfo
    store.commit(`setUserInfo`, res.data);
  });
}