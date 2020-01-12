import Layout from '$components/Layout';

const npc = [{
  path: '/npc',
  component: () => import('$components/SpaceLayout.vue'),
  redirect: 'list',
  meta: {
    title: 'NPC'
  },
  children: [{
    name: 'npcList',
    path: 'list',
    component: () => import('@/views/scene/npc/List'),
    meta: {
      title: 'NPC'
    }
  }, {
    name: 'npcDetail',
    path: 'info',
    component: () => import('@/views/scene/npc/Info'),
    hidden: true,
    meta: {
      title: 'NPC管理'
    }
  }]
}];

export default npc;
