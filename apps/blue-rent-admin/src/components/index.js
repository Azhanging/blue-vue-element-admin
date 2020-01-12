import SelectConfigType from './SelectConfigType';
import SelectToApi from './SelectToApi';

function useComponents(Vue) {
  Vue.component(`SelectConfigType`, SelectConfigType);
  Vue.component(`SelectToApi`, SelectToApi);
}

export default useComponents;
