import { loading, closeLoading } from "./loading";

export function useElementUiInVue(opts = {}) {
  const { Vue } = opts;
  Vue.prototype.$loading = loading;
  Vue.prototype.$closeLoading = closeLoading;
}