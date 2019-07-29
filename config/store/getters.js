import routes from '@router/routes';

const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.userInfo.token,
  avatar: state => state.userInfo.avatar,
  name: state => state.userInfo.name,
  introduction: state => state.userInfo.introduction,
  roles: state => state.userInfo.roles,
  routes: () => routes,
  errorLogs: state => state.errorLog.logs
};

export default getters
