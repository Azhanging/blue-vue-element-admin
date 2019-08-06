import variables from '$assets/css/element-admin/element-variables.scss';
import config from '@config';

const {
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo,
  onlyMain
} = config.view;

const state = {
  theme: variables.theme,
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo,
  onlyMain
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

