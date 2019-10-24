import Vue from 'vue';
import { useInVue } from '$use-in-vue';
import App from './App';
import store from './store';
import router from './router';
import { getUserInfo } from "$assets/js/user";

useInVue({
  Vue
});

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
