<template>
  <div class="app-container">

    <BvaHeader title="角色等级经验值配置"/>

    <BvaControl>
      <el-button icon="el-icon-refresh" @click="refreshLevel">
        刷新等级列表
      </el-button>
    </BvaControl>

    <BvaBody>
      <el-table border stripe tooltip-effect="light" :data="pageData.tableData">
        <el-table-column align="center" label="等级" prop="level"/>
        <el-table-column align="center" label="所需经验" prop="exp"/>
      </el-table>
    </BvaBody>
  </div>
</template>

<script>
  import list from '@/mixins/list';

  export default {
    name: "exp",
    mixins: [list()],
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.$axios.get(`/scene/level/list`).then((res) => {
          const { data } = res;
          this.pageData.tableData = data.list;
        });
      },
      refreshLevel() {
        this.$axios.get(`/scene/level/refresh`).then(() => {
          this.loadData();
        });
      }
    }
  }
</script>
