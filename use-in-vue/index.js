import 'normalize.css/normalize.css';
import '$assets/css/element-admin/element-variables.scss';
import '$assets/css/element-admin/index.scss';
import '$icons'; // icon
import '@/permission'; // permission control
import '$demo/utils/error-log'; // error log
import 'nprogress/nprogress.css';

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

  Vue.use(Element, {
    size: Cookies.get('size') || 'medium' // set element-ui default size
  });

  //全局过滤器
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
  });

  //axios
  Vue.prototype.$axios = $axios;

  Vue.mixin({
    data() {
      return {
        config
      }
    }
  });

  Vue.prototype.$genRules = genRules;

}