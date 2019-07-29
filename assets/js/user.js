import { apiGetUserInfo } from "$api";

//获取到用户信息
export function getUserInfo() {
  return apiGetUserInfo().then(() => {

  });
}