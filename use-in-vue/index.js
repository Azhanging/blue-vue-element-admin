import 'normalize.css/normalize.css';
import '$assets/css/element-admin/element-variables.scss';
import '$assets/css/element-admin/index.scss';
import '$icons'; // icon
import '@/permission'; // permission control
import '$demo/utils/error-log'; // error log
import 'nprogress/nprogress.css';
import { useComponentsInVue } from '$components';

import NProgress from 'nprogress';
import Cookies from 'js-cookie';
import Element from 'element-ui';
import $axios from '$axios';
import config from '@config';
import * as filters from '@/filters';
import { genRules } from './validate';

//自定义指令
import { useDirectiveInVue } from './directive';

NProgress.configure({
  showSpinner: false
});

export function useInVue(opts = {}) {
  const { Vue } = opts;

  useDirectiveInVue({
    Vue
  });

  //注册公共的组件
  useComponentsInVue(Vue);

  Vue.use(Element, {
    size: Cookies.get('size') || 'mini' // set element-ui default size
  });

  //全局过滤器
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
  });

  //axios
  Vue.prototype.$axios = $axios;

  //配置mixin config
  Vue.mixin({
    data() {
      return {
        config
      }
    }
  });

  //校验
  Vue.prototype.$genRules = genRules;

}