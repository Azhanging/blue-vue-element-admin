import Layout from '$components/Layout';

const resource = [{
  path: '/monster',
  component: () => import('$components/SpaceLayout.vue'),
  redirect: 'list',
  meta: {
    title: '怪物'
  },
  children: [{
    name: 'monsterList',
    path: 'list',
    component: () => import('@/views/scene/monster/List'),
    meta: {
      title: '怪物'
    }
  }, {
    name: 'monsterDetail',
    path: 'detail',
    component: () => import('@/views/scene/monster/Detail'),
    hidden: true,
    meta: {
      title: '添加怪物'
    }
  }]
}];

export default resource;
