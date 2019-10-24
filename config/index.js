const config = {
  view: {
    title: "blue-vue-admin-tmpl",
    showSettings: true,
    tagsView: true,
    fixedHeader: true,
    sidebarLogo: true,
    errorLog: 'production',
    //是否显示菜单
    onlyMain: false,
    //是否显示demo的内容
    hasDemo: true
  },
  path: {
    login: ``
  },
  login: {
    storage: {
      ['token']: `token`
    }
  },
  role: {
    //权限路由白名单
    routesWhiteList: [
      '/login',
      '/auth-redirect'
    ]
  },

  //错误相关
  error: {
    404: {
      path: '/error/404'
    }
  },

  axios: {
    timeout: 5000
  }
};

export default config;