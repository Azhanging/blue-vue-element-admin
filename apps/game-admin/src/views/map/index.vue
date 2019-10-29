<template>
  <div class="app-container">
    <BvaHeader title="地图列表" />
    <BvaControl>
      <el-button icon="el-icon-plus" type="primary">
        新增地图
      </el-button>
      <el-button icon="el-icon-refresh">
        刷新
      </el-button>
    </BvaControl>

    <BvaBody>
      <el-table border stripe tooltip-effect="light">
        <el-table-column align="center" label="id" />
        <el-table-column align="center" label="地图名" />
        <el-table-column align="center" label="npc" />
      </el-table>
    </BvaBody>

  </div>
</template>

<script>
  export default {
    name: "map-index"
  }
</script>

<style scoped>

</style>
