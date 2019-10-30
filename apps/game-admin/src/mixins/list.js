import utils from 'blue-utils';

function genData(getData) {
  return utils.extend({
    pageInfo: {},
    tableData: [],
    selection: []
  }, getData());
}

function search(opts = {}) {
  const {
    getForm = function () {
      return {}
    },
    getData = function () {
      return {}
    }
  } = opts;
  return {
    data() {
      return {
        pageData: genData(getData)
      };
    },
    methods: {
      //设置当前页码
      currentPageChange(val) {
        this.pageData.query.pageNum = val;
        this.loadData();
      },
      //搜索
      search() {
        this.resetCurrentPage();
        this.loadData();
      },
      //完全初始化
      refresh() {
        this.pageData = genData(getData);
        this.loadData();
      },
      //刷新当前page
      refreshPage() {
        const pageNum = this.pageData.query.pageNum;
        this.currentPageChange(pageNum);
      },
      //重新设置当前页面
      resetCurrentPage(pageName) {
        this.pageData.query.pageNum = pageName || 1;
      },
      //重置筛选
      resetQuery() {
        this.pageData.query.form = getForm();
      },
      //清空数据
      changeDate(date) {
        if (date == null) {
          return [];
        }
      },
      //选择
      selectChange(selection) {
        const ids = [];
        (selection || []).forEach((item) => {
          ids.push(item.id);
        });
        this.pageData.selection = ids;
      }
    }
  };
}

export default search;
