import code from './code';
import { unLogin, loginExpire } from '$assets/js/login';
import { Message } from 'element-ui';

//错误码处理
export function codeHandler(opts = {}) {
  const {
    code: requestCode,
    message,
    type: messageType,
  } = opts;
  switch (requestCode) {

    //未登录处理
    case code.UN_LOGIN:
      unLogin();
      break;

    //只做消息提醒
    case code.MESSAGE:
      Message({
        message: message,
        type: messageType,
      });
      break;

    //登录超时
    case code.LOGIN_EXPIRE:
      loginExpire();
      break;

    //default
    default:
      ;
  }
}



