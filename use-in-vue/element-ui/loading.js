import store from '@store';

//loading的id
let loadingID = 0;


//加载状态
export function loading() {
  store.commit(`setLoading`, true);
  return ++loadingID;
}

//关闭加载状态
export function closeLoading(id){
  if (!id || (id === loadingID)) {
    store.commit(`setLoading`, false);
  }
}