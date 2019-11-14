import Layout from '$components/Layout';

const npc = [{
  path: '/npc',
  component: Layout,
  redirect: 'list',
  meta: {
    title: 'NPC'
  },
  children: [{
    name: 'npcList',
    path: 'list',
    component: () => import('@/views/npc/list'),
    meta: {
      title: 'NPC'
    }
  }, {
    name: 'npcDetail',
    path: 'detail',
    component: () => import('@/views/npc/detail'),
    hidden: true,
    meta: {
      title: 'NPC管理'
    }
  }]
}];

export default npc;
