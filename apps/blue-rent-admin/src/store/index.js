import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import state from './state';
import mutations from './mutations';
import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  modules
});

export default store
