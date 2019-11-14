import Layout from '$components/Layout';

const resource = [{
  path: '/monster',
  component: Layout,
  redirect: 'list',
  meta: {
    title: '怪物'
  },
  children: [{
    name: 'monsterList',
    path: 'list',
    component: () => import('@/views/monster/list'),
    meta: {
      title: '怪物'
    }
  }, {
    name: 'monsterDetail',
    path: 'detail',
    component: () => import('@/views/monster/detail'),
    hidden: true,
    meta: {
      title: '添加怪物'
    }
  }]
}];

export default resource;
