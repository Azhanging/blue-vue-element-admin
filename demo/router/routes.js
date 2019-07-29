import Layout from '$components/layout';
import componentsRouter from './modules/components';
import chartsRouter from './modules/charts';
import tableRouter from './modules/table';
import nestedRouter from './modules/nested';

const routes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () => import('$demo/views/redirect/index')
  }]
}, {
  path: '/login',
  component: () => import('$demo/views/login/index'),
  hidden: true
}, {
  path: '/auth-redirect',
  component: () => import('$demo/views/login/auth-redirect'),
  hidden: true
}, {
  path: '/404',
  component: () => import('$demo/views/error-page/404'),
  hidden: true
}, {
  path: '/401',
  component: () => import('$demo/views/error-page/401'),
  hidden: true
}, {
  path: '/',
  component: Layout,
  redirect: 'home',
  children: [{
    path: 'home',
    component: () => import('$demo/views/home/index'),
    name: 'Home',
    meta: {
      title: 'home/首页',
      icon: 'home',
      affix: true
    }
  }]
}, {
  path: '/guide',
  component: Layout,
  redirect: '/guide/index',
  children: [{
    path: 'index',
    component: () => import('$demo/views/guide/index'),
    name: 'Guide',
    meta: {
      title: 'Guide/向导',
      icon: 'guide',
      noCache: true
    }
  }]
}, {
  path: '/profile',
  component: Layout,
  redirect: '/profile/index',
  hidden: true,
  children: [{
    path: 'index',
    component: () => import('$demo/views/profile/index'),
    name: 'Profile',
    meta: {
      title: 'Profile',
      icon: 'user',
      noCache: true
    }
  }]
}, {
  path: '/permission',
  component: Layout,
  redirect: '/permission/page',
  alwaysShow: true, // will always show the root menu
  name: 'Permission',
  meta: {
    title: 'Permission/权限',
    icon: 'lock',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [{
    path: 'page',
    component: () => import('$demo/views/permission/page'),
    name: 'PagePermission',
    meta: {
      title: 'Page Permission',
      roles: ['admin'] // or you can only set roles in sub nav
    }
  }, {
    path: 'directive',
    component: () => import('$demo/views/permission/directive'),
    name: 'DirectivePermission',
    meta: {
      title: 'Directive Permission'
      // if do not set roles, means: this page does not require permission
    }
  }, {
    path: 'role',
    component: () => import('$demo/views/permission/role'),
    name: 'RolePermission',
    meta: {
      title: 'Role Permission',
      roles: ['admin']
    }
  }]
}, {
  path: '/icon',
  component: Layout,
  children: [{
    path: 'index',
    component: () => import('$demo/views/icons/index'),
    name: 'Icons',
    meta: {
      title: 'Icons',
      icon: 'icon',
      noCache: true
    }
  }]
}, componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter, {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'example'
    },
    children: [{
      path: 'create',
      component: () => import('$demo/views/example/create'),
      name: 'CreateArticle',
      meta: {
        title: 'Create Article',
        icon: 'edit'
      }
    }, {
      path: 'edit/:id(\\d+)',
      component: () => import('$demo/views/example/edit'),
      name: 'EditArticle',
      meta: {
        title: 'Edit Article',
        noCache: true,
        activeMenu: '/example/list'
      },
      hidden: true
    }, {
      path: 'list',
      component: () => import('$demo/views/example/list'),
      name: 'ArticleList',
      meta: {
        title: 'Article List',
        icon: 'list'
      }
    }]
  }, {
    path: '/tab',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('$demo/views/tab/index'),
      name: 'Tab',
      meta: {
        title: 'Tab',
        icon: 'tab'
      }
    }]
  }, {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [{
      path: '401',
      component: () => import('$demo/views/error-page/401'),
      name: 'Page401',
      meta: {
        title: '401',
        noCache: true
      }
    }, {
      path: '404',
      component: () => import('$demo/views/error-page/404'),
      name: 'Page404',
      meta: {
        title: '404',
        noCache: true
      }
    }]
  }, {
    path: '/error-log',
    component: Layout,
    children: [{
      path: 'log',
      component: () => import('$demo/views/error-log/index'),
      name: 'ErrorLog',
      meta: {
        title: 'Error Log',
        icon: 'bug'
      }
    }]
  }, {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [{
      path: 'export-excel',
      component: () => import('$demo/views/excel/export-excel'),
      name: 'ExportExcel',
      meta: { title: 'Export Excel' }
    }, {
      path: 'export-selected-excel',
      component: () => import('$demo/views/excel/select-excel'),
      name: 'SelectExcel',
      meta: { title: 'Export Selected' }
    }, {
      path: 'export-merge-header',
      component: () => import('$demo/views/excel/merge-header'),
      name: 'MergeHeader',
      meta: { title: 'Merge Header' }
    }, {
      path: 'upload-excel',
      component: () => import('$demo/views/excel/upload-excel'),
      name: 'UploadExcel',
      meta: { title: 'Upload Excel' }
    }]
  }, {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: {
      title: 'Zip',
      icon: 'zip'
    },
    children: [{
      path: 'download',
      component: () => import('$demo/views/zip/index'),
      name: 'ExportZip',
      meta: { title: 'Export Zip' }
    }]
  }, {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [{
      path: 'index',
      component: () => import('$demo/views/pdf/index'),
      name: 'PDF',
      meta: {
        title: 'PDF',
        icon: 'pdf'
      }
    }]
  }, {
    path: '/pdf/download',
    component: () => import('$demo/views/pdf/download'),
    hidden: true
  }, {
    path: '/theme',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('$demo/views/theme/index'),
      name: 'Theme',
      meta: {
        title: 'Theme',
        icon: 'theme'
      }
    }]
  }, {
    path: '/clipboard',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('$demo/views/clipboard/index'),
      name: 'ClipboardDemo',
      meta: {
        title: 'Clipboard/剪切板',
        icon: 'clipboard'
      }
    }]
  }, {
    path: 'external-link',
    component: Layout,
    children: [{
      path: 'https://github.com/PanJiaChen/vue-element-admin',
      meta: {
        title: 'External Link/外部链接',
        icon: 'link'
      }
    }]
  }, {
    path: '*',
    redirect: '/404',
    hidden: true
  }];

export default routes;

