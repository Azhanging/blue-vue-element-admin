<template>
  <div class="app-container">
    <BvaHeader title="游戏资源"/>
    <BvaControl>
      <el-button icon="el-icon-plus" type="primary">
        新增资源
      </el-button>
      <el-button icon="el-icon-refresh">
        刷新
      </el-button>
    </BvaControl>

    <BvaBody>
      <el-table border stripe tooltip-effect="light">
        <el-table-column align="center" label="id" prop="id"/>
        <el-table-column align="center" label="资源名" prop="name"/>
        <el-table-column align="center" label="资源简介" prop="desc"/>
        <el-table-column align="center" label="资源类型" prop="type"/>
        <el-table-column align="center" label="是否可交易" prop="trade"/>
        <el-table-column align="center" label="价格" prop="price"/>
      </el-table>
    </BvaBody>

  </div>
</template>

<script>

  import list from '@/mixins/list';

  function getForm() {

  }

  function getData() {
    return {

    }
  }

  export default {
    name: "resource-index",
    mixins: [list({
      getForm,
      getData
    })],
    created() {
      this.loadData();
    },
    methods: {
      loadData() {

      }
    }
  }
</script>
