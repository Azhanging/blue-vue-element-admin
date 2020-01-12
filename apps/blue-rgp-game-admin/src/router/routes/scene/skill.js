const skill = [{
  path: '/skill',
  component: () => import('$components/SpaceLayout.vue'),
  redirect: 'list',
  meta: {
    title: '技能'
  },
  children: [{
    name: 'skillList',
    path: 'list',
    component: () => import('@/views/scene/skill/List'),
    meta: {
      title: '技能'
    }
  }, {
    name: 'skillDetail',
    path: 'info',
    component: () => import('@/views/scene/skill/Info'),
    hidden: true,
    meta: {
      title: '添加技能'
    }
  }]
}];

export default skill;
