import BvaHeader from '$components/BvaHeader';
import BvaControl from '$components/BvaControl';
import BvaBody from '$components/BvaBody';
import BvaFooter from '$components/BvaFooter';

export function useComponentsInVue(Vue) {
  Vue.component('BvaHeader', BvaHeader);
  Vue.component('BvaControl', BvaControl);
  Vue.component('BvaBody', BvaBody);
  Vue.component('BvaFooter', BvaFooter);
}