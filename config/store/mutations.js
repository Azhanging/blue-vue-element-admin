//公共的mutation
const mutations = {
  //设置用户信息
  setUserInfo(state, uerInfo) {
    state.userInfo = uerInfo;
  },
  //设置loading
  setLoading(state, status) {
    state.view.loading = !!status;
  }
};

export default mutations;