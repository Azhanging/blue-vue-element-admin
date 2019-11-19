import Layout from '$components/Layout';

const skill = [{
  path: '/skill',
  component: Layout,
  redirect: 'list',
  meta: {
    title: '技能'
  },
  children: [{
    name: 'skillList',
    path: 'list',
    component: () => import('@/views/skill/list'),
    meta: {
      title: '技能'
    }
  }, {
    name: 'skillDetail',
    path: 'detail',
    component: () => import('@/views/skill/detail'),
    hidden: true,
    meta: {
      title: '添加技能'
    }
  }]
}];

export default skill;
