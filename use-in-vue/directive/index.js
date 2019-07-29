import clipboard from './clipboard/index';
import ElDragDiaLog from './el-drag-dialog/index';
import ElTable from './el-table/index';
import Permission from './permission/index';
import Waves from './waves/index';
import Sticky from './sticky';

export function useDirectiveInVue(opts = {}) {
  const { Vue } = opts;
  [
    clipboard,
    ElDragDiaLog,
    ElTable,
    Permission,
    Waves,
    Sticky
  ].forEach((directive) => {
    directive.install(Vue);
  });
}