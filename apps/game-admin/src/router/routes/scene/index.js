import Layout from '$components/Layout';

import map from "./map";
import resource from "./resource";
import npc from "./npc";
import monster from "./monster";
import task from "./task";
import occupation from "./occupation";
import skill from "./skill";
import level from "./level";

//场景相关
const scene = [{
  path: '/scene',
  component: Layout,
  meta: {
    title: '场景'
  },
  children: [
    ...resource,
    ...npc,
    ...monster,
    ...task,
    ...map,
    ...occupation,
    ...skill,
    ...level
  ]
}];

export default scene;
