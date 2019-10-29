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
        <el-table-column align="center" label="id"/>
        <el-table-column align="center" label="资源名"/>
      </el-table>
    </BvaBody>

  </div>
</template>

<script>
  export default {
    name: "resource-index",
    created() {
      this.loadData();
    },
    methods: {
      loadData() {

      }
    }
  }
</script>
