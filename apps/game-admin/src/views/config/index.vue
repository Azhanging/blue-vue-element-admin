<template>
  <div class="app-container">
    <BvaHeader title="配置列表"/>
    <BvaControl>
      <el-button icon="el-icon-plus" type="primary" @click="$router.push('add')">
        新增配置
      </el-button>
      <el-button icon="el-icon-refresh">
        刷新
      </el-button>
    </BvaControl>

    <BvaBody>
      <el-table border stripe tooltip-effect="light" :data="pageData.tableData">
        <el-table-column align="center" label="id" prop="id"/>
        <el-table-column align="center" label="配置NAME" prop="name"/>
        <el-table-column align="center" label="配置VALUE" prop="value"/>
        <el-table-column align="center" label="配置注释" prop="comments"/>
      </el-table>
    </BvaBody>
  </div>
</template>

<script>

  import list from '@/mixins/list';

  function getData() {
    return {}
  }

  export default {
    name: "configList",
    mixins: [list({
      getData
    })],
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        const pageData = this.pageData;
        this.$axios.get(`/config/list`).then((res) => {
          const { data } = res;
          pageData.tableData = data.list;
        });
        this.$axios.get(`/config/getConfigByName?name=RESOURCE_TYPE`)
      }
    }
  }
</script>
