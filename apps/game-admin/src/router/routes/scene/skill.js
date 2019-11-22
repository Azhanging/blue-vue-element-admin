import Layout from '$components/Layout';

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
    component: () => import('@/views/scene/skill/list'),
    meta: {
      title: '技能'
    }
  }, {
    name: 'skillDetail',
    path: 'detail',
    component: () => import('@/views/scene/skill/detail'),
    hidden: true,
    meta: {
      title: '添加技能'
    }
  }]
}];

export default skill;
