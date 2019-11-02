import Vue from 'vue';
import { useInVue } from '$use-in-vue';
import useInVueProgram from './use-in-vue-program';
import App from './App';
import store from './store';
import router from './router';
import { getUserInfo } from "$assets/js/user";
import '@assets/css/app.scss';
import '@assets/css/blue-component.scss';

useInVue({
  Vue
});

useInVueProgram(Vue);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  mounted() {
    getUserInfo();
  },
  render: h => h(App)
});
