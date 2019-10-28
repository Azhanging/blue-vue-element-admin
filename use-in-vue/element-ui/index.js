import { loading, hideLoading } from "./loading";

export function useElementUiInVue(opts = {}) {
  const { Vue } = opts;
  Vue.prototype.$loading = loading;
  Vue.prototype.$hideLoading = hideLoading;
}