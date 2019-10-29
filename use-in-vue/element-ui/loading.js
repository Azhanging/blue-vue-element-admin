import store from '@store';
import BlueQueuePipe from 'blue-queue-pipe';

//loading队列
const loadingQueue = new BlueQueuePipe();

//加载状态
export function showLoading() {
  if (loadingQueue.isEmpty()) {
    store.commit(`setLoading`, true);
  }
  loadingQueue.enqueue(1);
}

//关闭加载状态
export function hideLoading(hideAllLoading = false) {
  if (hideAllLoading === true) {
    loadingQueue.clear();
    store.commit(`setLoading`, false);
  } else {
    loadingQueue.dequeue();
    loadingQueue.isEmpty() && store.commit(`setLoading`, false);
  }
}