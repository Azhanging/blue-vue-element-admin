import variables from '$assets/css/element-admin/element-variables.scss';
import config from '@config';

const {
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo
} = config.view;

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
};

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

